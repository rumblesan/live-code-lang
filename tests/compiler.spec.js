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
      Closure(
        'funcbar2',
        ['a'],
        ['time'],
        BinaryOp('*', Variable('a'), Variable('time'))
      ),
      Assignment('foo', FuncPointer('funcfoo1')),
      Assignment('bar', ClosurePointer('funcbar2', ['time'])),
    ]);

    const transformed = lambdaLifter(initialAst);

    assert.deepEqual(transformed, expected);
  });

  it('lifts more complex free variable lambdas', function() {
    const initialAst = Block([
      Assignment(
        'foo',
        Lambda(
          ['a'],
          Block([
            Assignment(
              'bar',
              Lambda(['b'], BinaryOp('*', Variable('b'), Variable('time')))
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
        ['time'],
        BinaryOp('*', Variable('b'), Variable('time'))
      ),
      Closure(
        'funcfoo2',
        ['a'],
        ['time'],
        Block([
          Assignment('bar', ClosurePointer('funcbar1', ['time'])),
          Application('funcbar1', [Variable('a')]),
        ])
      ),
      Assignment('foo', ClosurePointer('funcfoo2', ['time'])),
    ]);

    const transformed = lambdaLifter(initialAst);

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
      Closure(
        'funcbar1',
        ['b'],
        ['time'],
        BinaryOp('*', Variable('b'), Variable('time'))
      ),
      Closure(
        'funcfoo2',
        ['a'],
        ['time', 'baz'],
        Block([
          Assignment('bar', ClosurePointer('funcbar1', ['time'])),
          If(
            Num(1),
            Block([
              Application('funcbar1', [BinaryOp('+', Variable('baz'), Num(2))]),
            ])
          ),
        ])
      ),
      Assignment('baz', Num(4)),
      Assignment('foo', ClosurePointer('funcfoo2', ['time', 'baz'])),
    ]);

    const transformed = lambdaLifter(initialAst);

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
        ['time', 'x'],
        Block([Assignment('x', BinaryOp('*', Variable('b'), Variable('time')))])
      ),
      Closure(
        'funcfoo2',
        ['a'],
        ['time', 'x'],
        Block([
          Assignment('bar', ClosurePointer('funcbar1', ['time', 'x'])),
          Application('funcbar1', [Variable('a')]),
        ])
      ),
      Assignment('x', Num(3)),
      Assignment('foo', ClosurePointer('funcfoo2', ['time', 'x'])),
      Application('funcfoo2', [Num(1)]),
    ]);

    const transformed = lambdaLifter(initialAst);

    assert.deepEqual(transformed, expected);
  });
});
