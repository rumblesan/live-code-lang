/* global describe, it */

import parser from 'parser';

import { Application, Assignment, Block, Num, Loop, Variable } from 'ast';

import { dedent } from 'dentist';

import assert from 'assert';

describe('Loop', function() {
  it('basic times loop works', function() {
    var program = dedent(`
                         loop 4 times {
                           box(4)
                         }
                         `);
    var parsed = parser.parse(program);

    var expected = Block([
      Loop(Num(4), Block([Application(Variable('box'), [Num(4)])])),
    ]);
    assert.deepEqual(parsed, expected);
  });

  it('times loop with variable', function() {
    var program = dedent(`
                         loop 4 times with i {
                           box(4)
                         }
                         `);
    var parsed = parser.parse(program);

    var expected = Block([
      Loop(Num(4), Block([Application(Variable('box'), [Num(4)])]), 'i'),
    ]);
    assert.deepEqual(parsed, expected);
  });

  it('times loop with variable number and loopvar', function() {
    var program = dedent(`
                         foo = 100
                         loop foo times with i {
                           box(4)
                         }
                         `);
    var parsed = parser.parse(program);

    var expected = Block([
      Assignment(Variable('foo'), Num(100)),
      Loop(
        Variable('foo'),
        Block([Application(Variable('box'), [Num(4)])]),
        'i'
      ),
    ]);
    assert.deepEqual(parsed, expected);
  });
});
