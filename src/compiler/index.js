import {
  Null,
  // Block,
  // Assignment,
  // Application,
  // If,
  // Lambda,
  // Times,
  // DoOnce,
  // UnaryOp,
  // BinaryOp,
  // DeIndex,
  // Num,
  // Variable,
  // Str,
  // List,
} from 'ast';

import {
  NULL,
  // BLOCK,
  // ASSIGNMENT,
  // APPLICATION,
  // IF,
  // LAMBDA,
  // TIMES,
  // DOONCE,
  // UNARYOP,
  // BINARYOP,
  // DEINDEX,
  // NUMBER,
  // VARIABLE,
  // STRING,
  // LIST,
} from 'ast/types';

import lambdaLifter from './lambdaLifter';

import { astTransform } from 'ast/func';

export function compile(ast) {
  const lifted = lambdaLifter(ast);
  return astTransform(lifted, {});
}
