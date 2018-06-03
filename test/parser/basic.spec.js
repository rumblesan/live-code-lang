/* global describe, it */

import parser from 'parser';

import {
  Application,
  Assignment,
  BinaryOp,
  Block,
  Lambda,
  Num,
  Return,
  Variable,
} from 'ast';

import { dedent } from 'dentist';

import assert from 'assert';

describe('Basics', function() {
  it('simple program parses', function() {
    const program = dedent(`
                           c = 3.4
                           
                           a = (b, d) => {
                             return b + c * d
                           }
                           box(a(2, c))
                           `);

    const parsed = parser.parse(program);

    const expected = Block([
      Assignment(Variable('c'), Num(3.4)),
      Assignment(
        Variable('a'),
        Lambda(
          ['b', 'd'],
          Block([
            Return(
              BinaryOp(
                '+',
                Variable('b'),
                BinaryOp('*', Variable('c'), Variable('d'))
              )
            ),
          ])
        )
      ),
      Application(Variable('box'), [
        Application(Variable('a'), [Num(2), Variable('c')]),
      ]),
    ]);

    assert.deepEqual(parsed, expected);
  });
});
