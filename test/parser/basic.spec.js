/* global describe, it */

import parser from 'parser';
import lexer from 'parser/lexer';

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

    const tokens = lexer.tokenize(program);
    parser.initialize(tokens);
    const parsed = parser.program();

    const expected = Block([
      Assignment('c', Num(3.4)),
      Assignment(
        'a',
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
      Application('box', [Application('a', [Num(2), Variable('c')])]),
    ]);

    assert.deepEqual(parsed, expected);
  });
});
