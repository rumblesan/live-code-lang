/* global describe, it */

import { Block, Assignment, BinaryOp, Num, Variable } from 'ast';
import { NUMBER } from 'ast/types';

import * as assert from 'assert';

import { astTraverse, astTransform, defaultTraverseFunctions } from 'ast/func';

describe('AST Funcs', function() {
  it('astTraverse runs fine', function() {
    const initialAst = Block([
      Assignment(Variable('foo'), Num(4)),
      Assignment(Variable('bar'), BinaryOp('*', Num(2), Num(3))),
    ]);

    astTraverse(initialAst, defaultTraverseFunctions, {});
  });

  it('simple transform', function() {
    const initialAst = Block([
      Assignment(Variable('foo'), Num(4)),
      Assignment(Variable('bar'), BinaryOp('*', Num(2), Num(3))),
    ]);

    const expected = Block([
      Assignment(Variable('foo'), Num(8)),
      Assignment(Variable('bar'), BinaryOp('*', Num(4), Num(6))),
    ]);

    const transformed = astTransform(initialAst, {
      [NUMBER]: ast => Num(ast.value * 2),
    });

    assert.deepEqual(transformed, expected);
  });
});
