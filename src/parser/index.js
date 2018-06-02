import { ParserException } from 'canto34';

import * as ast from '../ast';

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
      throw new ParserException('No tokens available');
    }

    return this.tokens[0].type == tokenType;
  }
  lan(n, tokenType) {
    if (this.eof()) {
      throw new ParserException('No tokens available');
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

const parser = new Parser();

parser.program = function() {
  return this.block();
};

parser.block = function() {
  const result = [];
  if (this.la1('newline')) {
    this.match('newline');
  }
  while (!this.eof() && !this.la1('close bracket')) {
    result.push(this.statement());
    if (!this.eof() && this.la1('newline')) {
      this.match('newline');
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
  return ast.Assignment(name, expr);
};

parser.application = function() {
  const name = this.match('identifier').content;
  this.match('open paren');
  const args = this.argList();
  this.match('close paren');
  return ast.Application(name, args);
};

parser.argList = function() {
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
  if (this.la1('floating point')) {
    expr1 = ast.Num(this.match('floating point').content);
  } else if (this.la1('integer')) {
    expr1 = ast.Num(this.match('integer').content);
  } else if (this.la1('identifier') && this.lan(2, 'open paren')) {
    expr1 = this.application();
  } else if (this.la1('identifier')) {
    expr1 = ast.Variable(this.match('identifier').content);
  } else if (this.la1('open paren')) {
    expr1 = this.lambda();
  }
  if (!this.la1('operator')) {
    return expr1;
  }
  const operator = this.match('operator').content;
  const expr2 = this.expression();
  return ast.BinaryOp(operator, expr1, expr2);
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

export default parser;
