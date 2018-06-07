import { ParserException } from 'canto34';

import lexer from './lexer';

import * as ast from '../ast';
import * as astTypes from '../ast/types';

class ArithmaticShunter {
  constructor() {
    this.operatorStack = [];
    this.output = [];
    this.precedences = {
      '^': 15,
      '*': 14,
      '/': 14,
      '%': 14,
      '+': 13,
      '-': 13,
      '<': 11,
      '<=': 11,
      '>': 11,
      '>=': 11,
      '==': 10,
      '!=': 10,
      '&&': 6,
      '||': 5,
    };
  }
  shuntValue(value) {
    this.output.push(value);
  }
  collapseOp(op) {
    const v2 = this.output.pop();
    const v1 = this.output.pop();
    const expr = ast.BinaryOp(op, v1, v2);
    this.output.push(expr);
  }
  shuntOp(newOp) {
    if (!this.precedences[newOp]) {
      throw new ParserException(`${newOp} is not a valid operator`);
    }
    const peekOp = this.operatorStack[this.operatorStack.length - 1];
    if (this.precedences[newOp] <= this.precedences[peekOp]) {
      const topOp = this.operatorStack.pop();
      this.collapseOp(topOp);
    }
    this.operatorStack.push(newOp);
  }
  getOutput() {
    while (this.operatorStack.length > 0) {
      this.collapseOp(this.operatorStack.pop());
    }
    if (this.output.length !== 1) {
      throw new ParserException(
        'Should only be a single expression in shunter output'
      );
    }
    return this.output.pop();
  }
}

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
      const { type, content, line, character } = this.tokens[0];
      throw new ParserException(
        `Expected ${tokenType} but found ${type} (${content}) at l${line}.${character}`
      );
    }

    return this.tokens.shift();
  }
  eof() {
    return this.tokens.length === 0;
  }
  expectEof() {
    if (!this.eof()) {
      const { type, line, character } = this.tokens[0];
      throw new ParserException(
        `Expected EOF but found ${type} at l${line}.${character}`
      );
    }
  }
}

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
  if (this.la1('loop')) {
    return this.loop();
  }
  if (this.lan(2, 'assignment')) {
    return this.assignment();
  }
  return this.expression();
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

// TODO handle elseif
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

parser.loop = function() {
  this.match('loop');
  const timesExpr = this.expression();
  this.match('times');
  let loopVar;
  if (this.la1('with')) {
    this.match('with');
    loopVar = this.match('identifier').content;
  }
  this.match('open bracket');
  const loopBlock = this.block();
  this.match('close bracket');
  return ast.Loop(timesExpr, loopBlock, loopVar);
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
  let expr = this.baseExpression();
  if (!this.eof() && this.la1('operator')) {
    expr = this.arithmatic(expr);
  }
  return expr;
};

parser.baseExpression = function() {
  let expr;
  if (this.la1('open square bracket')) {
    expr = this.list();
  } else if (this.la1('floating point')) {
    expr = ast.Num(this.match('floating point').content);
  } else if (this.la1('integer')) {
    expr = ast.Num(this.match('integer').content);
  } else if (this.la1('operator')) {
    expr = ast.UnaryOp(this.match('operator').content, this.expression());
  } else if (this.la1('identifier')) {
    expr = ast.Variable(this.match('identifier').content);
    if (this.eof()) {
      return expr;
    }
    if (this.la1('open paren')) {
      this.match('open paren');
      const args = this.exprList();
      this.match('close paren');
      expr = ast.Application(expr, args);
    }
  } else if (this.la1('open paren')) {
    this.match('open paren');
    const exprList = this.exprList();
    this.match('close paren');

    if (!this.eof() && this.la1('function arrow')) {
      expr = this.lambda(exprList);
    } else {
      if (exprList.length <= 0) {
        throw new ParserException(
          'Cannot have an empty parenthesised expression'
        );
      }
      if (exprList.length >= 2) {
        throw new ParserException('No support for tuples, sorry');
      }
      expr = exprList[0];
    }
  } else {
    const { type, content, line, character } = this.tokens[0];
    throw new ParserException(
      `Could not parse Expression on ${type} (${content}) at l${line}.${character}`
    );
  }

  while (!this.eof() && this.la1('open square bracket')) {
    expr = this.deindex(expr);
  }

  return expr;
};

parser.deindex = function(expr) {
  this.match('open square bracket');
  const deIndexExpr = this.expression();
  this.match('close square bracket');
  return ast.DeIndex(expr, deIndexExpr);
};

parser.arithmatic = function(firstExpr) {
  const shunter = new ArithmaticShunter();
  shunter.shuntValue(firstExpr);
  while (!this.eof() && this.la1('operator')) {
    shunter.shuntOp(this.match('operator').content);
    shunter.shuntValue(this.baseExpression());
  }
  return shunter.getOutput();
};

parser.list = function() {
  this.match('open square bracket');
  const exprs = this.exprList();
  this.match('close square bracket');
  return ast.List(exprs);
};

const exprListToArgs = exprList => {
  return exprList.map(e => {
    if (e.type !== astTypes.VARIABLE) {
      throw new ParserException(
        `Lambda definition args should not be expressions but found ${e.type}`
      );
    }
    return e.identifier;
  });
};

parser.lambda = function(exprList) {
  const argList = exprListToArgs(exprList);
  this.match('function arrow');
  this.match('open bracket');
  if (this.la1('newline')) {
    const block = this.block();
    this.match('close bracket');
    return ast.Lambda(argList, block);
  } else {
    const expr = this.expression();
    this.match('close bracket');
    return ast.Lambda(argList, expr);
  }
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
  this.initialize(tokens);
  return this.program();
};

export default parser;
