/* global describe, it */

import {
  Block,
  Assignment,
  Application,
  BinaryOp,
  If,
  Func,
  FuncPointer,
  ClosurePointer,
  Closure,
  Num,
  Variable,
  VarPosition,
  ClosedVarPosition,
  GlobalVar,
} from 'ast';

import * as assert from 'assert';

import variableLifter from 'compiler/variableLifter';

describe('Variable Lifter', function() {
  it('lifts no/simple free variable lambdas', function() {
    const initialAst = Block([
      Func('funcfoo1', ['a'], BinaryOp('*', Variable('a'), Num(2))),
      Func('funcbar2', ['a'], BinaryOp('*', Variable('a'), GlobalVar('time'))),
      Assignment(Variable('foo'), FuncPointer('funcfoo1')),
      Assignment(Variable('bar'), FuncPointer('funcbar2')),
    ]);

    const expected = Block([
      Func('funcfoo1', ['a'], BinaryOp('*', VarPosition(0), Num(2))),
      Func('funcbar2', ['a'], BinaryOp('*', VarPosition(0), GlobalVar('time'))),
      Assignment(VarPosition(0), FuncPointer('funcfoo1')),
      Assignment(VarPosition(1), FuncPointer('funcbar2')),
    ]);

    const transformed = variableLifter(initialAst);

    assert.deepEqual(transformed, expected);
  });

  it('lifts more complex free variable lambdas', function() {
    const initialAst = Block([
      Closure(
        'funcbar1',
        ['b'],
        ['x'],
        BinaryOp('*', Variable('b'), Variable('x'))
      ),
      Closure(
        'funcfoo2',
        ['a'],
        ['x'],
        Block([
          Assignment(
            Variable('bar'),
            ClosurePointer('funcbar1', [Variable('x')])
          ),
          Application('funcbar1', [Variable('a')]),
        ])
      ),
      Assignment(Variable('x'), Num(3)),
      Assignment(Variable('foo'), ClosurePointer('funcfoo2', [Variable('x')])),
    ]);

    const expected = Block([
      Closure(
        'funcbar1',
        ['b'],
        ['x'],
        BinaryOp('*', VarPosition(0), ClosedVarPosition(0))
      ),
      Closure(
        'funcfoo2',
        ['a'],
        ['x'],
        Block([
          Assignment(
            VarPosition(1),
            ClosurePointer('funcbar1', [ClosedVarPosition(0)])
          ),
          Application('funcbar1', [VarPosition(0)]),
        ])
      ),
      Assignment(VarPosition(0), Num(3)),
      Assignment(VarPosition(1), ClosurePointer('funcfoo2', [VarPosition(0)])),
    ]);

    const transformed = variableLifter(initialAst);

    assert.deepEqual(transformed, expected);
  });

  it('lifts EVEN more complex nested lambdas', function() {
    const initialAst = Block([
      Func('funcbar1', ['b'], BinaryOp('*', Variable('b'), GlobalVar('time'))),
      Closure(
        'funcfoo2',
        ['a'],
        ['baz'],
        Block([
          Assignment(Variable('bar'), FuncPointer('funcbar1')),
          If(
            Num(1),
            Block([
              Application('funcbar1', [BinaryOp('+', Variable('baz'), Num(2))]),
            ])
          ),
        ])
      ),
      Assignment(Variable('baz'), Num(4)),
      Assignment(
        Variable('foo'),
        ClosurePointer('funcfoo2', [Variable('baz')])
      ),
    ]);

    const expected = Block([
      Func('funcbar1', ['b'], BinaryOp('*', VarPosition(0), GlobalVar('time'))),
      Closure(
        'funcfoo2',
        ['a'],
        ['baz'],
        Block([
          Assignment(VarPosition(1), FuncPointer('funcbar1')),
          If(
            Num(1),
            Block([
              Application('funcbar1', [
                BinaryOp('+', ClosedVarPosition(0), Num(2)),
              ]),
            ])
          ),
        ])
      ),
      Assignment(VarPosition(0), Num(4)),
      Assignment(VarPosition(1), ClosurePointer('funcfoo2', [VarPosition(0)])),
    ]);

    const globalVars = { time: true };
    const transformed = variableLifter(initialAst, globalVars);

    assert.deepEqual(transformed, expected);
  });
});
