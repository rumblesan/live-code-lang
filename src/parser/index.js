import { ParserException } from 'canto34';

import lexer from './lexer';

import * as ast from '../ast';
import * as astTypes from '../ast/types';

const exprListToArgs = exprList => {
  return exprList.map(e => {
    if (e.type !== astTypes.VARIABLE) {
      throw new ParserException(
        'Lambda definition args should not be expressions'
      );
    }
    return e.identifier;
  });
};

class Parser {
  initialize(tokens) {
    if (!tokens) {
      throw new ParserException('No tokens provided to the parser');
    }

    if (!(tokens instanceof Array)) {
      throw new ParserException(
        'A non-array was provided to the parser instead of a token array'
      );
    }

    this.tokens = tokens;
  }
  la1(tokenType) {
    if (this.eof()) {
      throw new ParserException(
        `No tokens available: Cannot find ${tokenType}`
      );
    }

    return this.tokens[0].type == tokenType;
  }
  lan(n, tokenType) {
    if (this.eof()) {
      throw new ParserException(
        `No tokens available: Cannot find ${tokenType}`
      );
    }

    return this.tokens[n - 1].type == tokenType;
  }
  match(tokenType) {
    if (this.eof()) {
      throw new ParserException(`Expected ${tokenType} but found EOF`);
    }

    if (!this.la1(tokenType)) {
      throw new ParserException(
        'Expected ' +
          tokenType +
          ' but found ' +
          this.tokens[0].type +
          ' at l' +
          this.tokens[0].line +
          '.' +
          this.tokens[0].character
      );
    }

    return this.tokens.shift();
  }
  eof() {
    return this.tokens.length === 0;
  }
  expectEof() {
    if (!this.eof()) {
      throw new ParserException(
        'Expected EOF but found ' +
          this.tokens[0].type +
          ' at l' +
          this.tokens[0].line +
          '.' +
          this.tokens[0].character
      );
    }
  }
}

/*
 *const precedence = {
 *  '*': 9,
 *  '/': 9,
 *  '+': 8,
 *  '-': 8,
 *};
 */

const parser = new Parser();

parser.program = function() {
  return this.block();
};

parser.block = function() {
  const result = [];
  while (!this.eof() && !this.la1('close bracket')) {
    if (this.la1('newline')) {
      this.match('newline');
    } else {
      result.push(this.statement());
    }
  }
  return ast.Block(result);
};

parser.statement = function() {
  if (this.la1('return')) {
    this.match('return');
    const expr = this.expression();
    return ast.Return(expr);
  }
  if (this.la1('if')) {
    return this.ifStatement();
  }
  if (this.lan(2, 'open paren')) {
    return this.application();
  }
  if (this.lan(2, 'assignment')) {
    return this.assignment();
  }
  throw new ParserException(
    'Could not parse return, application or assignment'
  );
};

parser.assignment = function() {
  const name = this.match('identifier').content;
  this.match('assignment');
  const expr = this.expression();
  return ast.Assignment(ast.Variable(name), expr);
};

parser.application = function() {
  const name = this.match('identifier').content;
  this.match('open paren');
  const args = this.exprList();
  this.match('close paren');
  return ast.Application(ast.Variable(name), args);
};

parser.ifStatement = function() {
  this.match('if');
  const predicate = this.expression();
  this.match('open bracket');
  this.match('newline');
  const ifBlock = this.block();
  this.match('close bracket');
  if (!this.eof() && this.la1('else')) {
    this.match('else');
    this.match('open bracket');
    this.match('newline');
    const elseBlock = this.block();
    this.match('close bracket');
    return ast.If(predicate, ifBlock, elseBlock);
  }
  return ast.If(predicate, ifBlock);
};

parser.exprList = function() {
  const args = [];
  if (this.la1('close paren')) {
    return args;
  }
  args.push(this.expression());
  while (this.la1('comma')) {
    this.match('comma');
    args.push(this.expression());
  }
  return args;
};

parser.expression = function() {
  let expr1;
  if (this.la1('open square bracket')) {
    expr1 = this.list();
  } else if (this.la1('floating point')) {
    expr1 = ast.Num(this.match('floating point').content);
  } else if (this.la1('integer')) {
    expr1 = ast.Num(this.match('integer').content);
  } else if (this.la1('operator')) {
    const op = this.match('operator').content;
    const expr = this.expression();
    expr1 = ast.UnaryOp(op, expr);
  } else if (this.la1('identifier')) {
    expr1 = ast.Variable(this.match('identifier').content);
    if (this.eof()) {
      return expr1;
    }
    if (this.la1('open paren')) {
      this.match('open paren');
      const args = this.exprList();
      this.match('close paren');
      expr1 = ast.Application(expr1, args);
    }
  } else if (this.la1('open paren')) {
    this.match('open paren');
    const maybeList = this.exprList();
    this.match('close paren');

    if (!this.eof() && this.la1('function arrow')) {
      this.match('function arrow');
      this.match('open bracket');
      if (this.la1('newline')) {
        const block = this.block();
        this.match('close bracket');
        return ast.Lambda(exprListToArgs(maybeList), block);
      } else {
        const expr = this.expression();
        this.match('close bracket');
        return ast.Lambda(exprListToArgs(maybeList), expr);
      }
    } else {
      if (maybeList.length <= 0) {
        throw new ParserException(
          'Cannot have an empty parenthesised expression'
        );
      }
      if (maybeList.length >= 2) {
        throw new ParserException('No support for tuples, sorry');
      }
      expr1 = maybeList[0];
    }
  }
  if (this.eof()) {
    return expr1;
  }

  if (this.la1('operator')) {
    const operator = this.match('operator').content;
    const expr2 = this.expression();
    return ast.BinaryOp(operator, expr1, expr2);
  }

  if (this.la1('open square bracket')) {
    this.match('open square bracket');
    const deIndexExpr = this.expression();
    this.match('close square bracket');
    return ast.DeIndex(expr1, deIndexExpr);
  }
  return expr1;
};

parser.list = function() {
  this.match('open square bracket');
  const exprs = this.exprList();
  this.match('close square bracket');
  return ast.List(exprs);
};

parser.lambda = function() {
  this.match('open paren');
  const argNames = this.nameList();
  this.match('close paren');
  this.match('function arrow');
  this.match('open bracket');
  const block = this.block();
  this.match('close bracket');
  return ast.Lambda(argNames, block);
};

parser.nameList = function() {
  const names = [];
  if (this.la1('close paren')) {
    return names;
  }
  names.push(this.match('identifier').content);
  while (this.la1('comma')) {
    this.match('comma');
    names.push(this.match('identifier').content);
  }
  return names;
};

parser.parse = function(program) {
  const tokens = lexer.tokenize(program);
  console.log(tokens);
  this.initialize(tokens);
  return this.program();
};

export default parser;
