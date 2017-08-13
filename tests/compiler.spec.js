/* global describe, it */

import {
  Block,
  Assignment,
  Application,
  BinaryOp,
  If,
  Lambda,
  Func,
  FuncPointer,
  ClosurePointer,
  Closure,
  Num,
  Variable,
  GlobalVar,
} from 'ast';

import * as assert from 'assert';

import { lambdaLifter } from 'compiler/lambdaLifter';

describe('Lambda Lifter', function() {
  it('lifts no/simple free variable lambdas', function() {
    const initialAst = Block([
      Assignment('foo', Lambda(['a'], BinaryOp('*', Variable('a'), Num(2)))),
      Assignment(
        'bar',
        Lambda(['a'], BinaryOp('*', Variable('a'), Variable('time')))
      ),
    ]);

    const expected = Block([
      Func('funcfoo1', ['a'], BinaryOp('*', Variable('a'), Num(2))),
      Func('funcbar2', ['a'], BinaryOp('*', Variable('a'), GlobalVar('time'))),
      Assignment('foo', FuncPointer('funcfoo1')),
      Assignment('bar', FuncPointer('funcbar2')),
    ]);

    const globalVars = { time: true };
    const transformed = lambdaLifter(initialAst, globalVars);

    assert.deepEqual(transformed, expected);
  });

  it('lifts more complex free variable lambdas', function() {
    const initialAst = Block([
      Assignment('x', Num(3)),
      Assignment(
        'foo',
        Lambda(
          ['a'],
          Block([
            Assignment(
              'bar',
              Lambda(['b'], BinaryOp('*', Variable('b'), Variable('x')))
            ),
            Application('bar', [Variable('a')]),
          ])
        )
      ),
    ]);

    const expected = Block([
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
          Assignment('bar', ClosurePointer('funcbar1', ['x'])),
          Application('funcbar1', [Variable('a')]),
        ])
      ),
      Assignment('x', Num(3)),
      Assignment('foo', ClosurePointer('funcfoo2', ['x'])),
    ]);

    const globalVars = { time: true };
    const transformed = lambdaLifter(initialAst, globalVars);

    assert.deepEqual(transformed, expected);
  });

  it('lifts EVEN more complex nested lambdas', function() {
    const initialAst = Block([
      Assignment('baz', Num(4)),
      Assignment(
        'foo',
        Lambda(
          ['a'],
          Block([
            Assignment(
              'bar',
              Lambda(['b'], BinaryOp('*', Variable('b'), Variable('time')))
            ),
            If(
              Num(1),
              Block([
                Application('bar', [BinaryOp('+', Variable('baz'), Num(2))]),
              ])
            ),
          ])
        )
      ),
    ]);

    const expected = Block([
      Func('funcbar1', ['b'], BinaryOp('*', Variable('b'), GlobalVar('time'))),
      Closure(
        'funcfoo2',
        ['a'],
        ['baz'],
        Block([
          Assignment('bar', FuncPointer('funcbar1')),
          If(
            Num(1),
            Block([
              Application('funcbar1', [BinaryOp('+', Variable('baz'), Num(2))]),
            ])
          ),
        ])
      ),
      Assignment('baz', Num(4)),
      Assignment('foo', ClosurePointer('funcfoo2', ['baz'])),
    ]);

    const globalVars = { time: true };
    const transformed = lambdaLifter(initialAst, globalVars);

    assert.deepEqual(transformed, expected);
  });

  it('finds external assignment variable in lambda', function() {
    const initialAst = Block([
      Assignment('x', Num(3)),
      Assignment(
        'foo',
        Lambda(
          ['a'],
          Block([
            Assignment(
              'bar',
              Lambda(
                ['b'],
                Block([
                  Assignment(
                    'x',
                    BinaryOp('*', Variable('b'), Variable('time'))
                  ),
                ])
              )
            ),
            Application('bar', [Variable('a')]),
          ])
        )
      ),
      Application('foo', [Num(1)]),
    ]);

    const expected = Block([
      Closure(
        'funcbar1',
        ['b'],
        ['x'],
        Block([
          Assignment('x', BinaryOp('*', Variable('b'), GlobalVar('time'))),
        ])
      ),
      Closure(
        'funcfoo2',
        ['a'],
        ['x'],
        Block([
          Assignment('bar', ClosurePointer('funcbar1', ['x'])),
          Application('funcbar1', [Variable('a')]),
        ])
      ),
      Assignment('x', Num(3)),
      Assignment('foo', ClosurePointer('funcfoo2', ['x'])),
      Application('funcfoo2', [Num(1)]),
    ]);

    const globalVars = { time: true };
    const transformed = lambdaLifter(initialAst, globalVars);

    assert.deepEqual(transformed, expected);
  });
});
