import {
  NULL,
  BLOCK,
  ASSIGNMENT,
  APPLICATION,
  IF,
  LAMBDA,
  FUNC,
  CLOSURE,
  TIMES,
  DOONCE,
  UNARYOP,
  BINARYOP,
  DEINDEX,
  NUMBER,
  VARIABLE,
  VARPOSITION,
  CLOSEDVARPOSITION,
  GLOBALVAR,
  FUNCPOINTER,
  CLOSUREPOINTER,
  STRING,
  LIST,
} from './types';

/**
 */
export function Null() {
  return {
    type: NULL,
  };
}

/**
 *  elements: [Element]
 */
export function Block(elements) {
  return {
    type: BLOCK,
    elements,
  };
}

/**
 *  variable: Variable
 *  expression: Expression
 */
export function Assignment(variable, expression) {
  return {
    type: ASSIGNMENT,
    variable,
    expression,
  };
}

/**
 *  identifier: Identifier
 *  args:       [Expression]
 */
export function Application(identifier, args, block = Null()) {
  return {
    type: APPLICATION,
    identifier,
    args,
    block,
  };
}

/**
 *  predicate: Expression
 *  ifBlock:   Block
 *  elseBlock: Block
 */
export function If(predicate, ifBlock, elseBlock = Null()) {
  return {
    type: IF,
    predicate,
    ifBlock,
    elseBlock,
  };
}

/**
 *  argNames:  [Identifier]
 *  body:      Block
 *  inlinable: Boolean
 */
export function Lambda(argNames, body, inlinable = false, freeVars = []) {
  return {
    type: LAMBDA,
    argNames,
    body,
    inlinable,
    freeVars,
  };
}

/**
 *  name:      Identifier
 *  argNames:  [Identifier]
 *  body:      Block
 */
export function Func(name, argNames, body) {
  return {
    type: FUNC,
    name,
    argNames,
    body,
  };
}

/**
 *  name:         Identifier
 *  argNames:     [Identifier]
 *  externalVars: [Identifier]
 *  body:         Block
 */
export function Closure(name, argNames, externalVars, body) {
  return {
    type: CLOSURE,
    name,
    argNames,
    externalVars,
    body,
  };
}

/**
 *  number:  Expression
 *  block:   Block
 *  loopVar: Identifier
 */
export function Times(number, block, loopVar = Null()) {
  return {
    type: TIMES,
    number,
    block,
    loopVar,
  };
}

/**
 *  block: Block
 */
export function DoOnce(active, block = Null()) {
  return {
    type: DOONCE,
    active,
    block,
  };
}

/**
 *  operation: String
 *  expr1: Expression
 */
export function UnaryOp(operator, expr1) {
  return {
    type: UNARYOP,
    operator,
    expr1,
  };
}

/**
 *  operation: String
 *  expr1: Expression
 *  expr2: Expression
 */
export function BinaryOp(operator, expr1, expr2) {
  return {
    type: BINARYOP,
    operator,
    expr1,
    expr2,
  };
}

/**
 *  collection: Expression
 *  index: Expression
 */
export function DeIndex(collection, index) {
  return {
    type: DEINDEX,
    collection,
    index,
  };
}

/**
 *  value: Number
 */
export function Num(value) {
  return {
    type: NUMBER,
    value,
  };
}

/**
 *  value: Identifier
 */
export function Variable(identifier) {
  return {
    type: VARIABLE,
    identifier,
  };
}

/**
 *  position: number
 */
export function VarPosition(position) {
  return {
    type: VARPOSITION,
    position,
  };
}

/**
 *  position: number
 */
export function ClosedVarPosition(position) {
  return {
    type: CLOSEDVARPOSITION,
    position,
  };
}

/**
 *  value: Identifier
 */
export function GlobalVar(identifier) {
  return {
    type: GLOBALVAR,
    identifier,
  };
}

/**
 *  funcname: Identifier
 */
export function FuncPointer(funcName) {
  return {
    type: FUNCPOINTER,
    funcName,
  };
}

/**
 *  funcname: Identifier
 *  externalVars: [Identifier]
 */
export function ClosurePointer(funcName, externalVars) {
  return {
    type: CLOSUREPOINTER,
    funcName,
    externalVars,
  };
}

/**
 *  value: String
 */
export function Str(value) {
  return {
    type: STRING,
    value,
  };
}

/**
 *  value: List
 */
export function List(values) {
  return {
    type: LIST,
    values,
  };
}
