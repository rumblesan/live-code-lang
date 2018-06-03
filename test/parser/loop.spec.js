/* global describe, it */

import parser from 'parser';

import { Application, Assignment, Block, Num, Times, Variable } from 'ast';

import { dedent } from 'dentist';

import assert from 'assert';

describe('Loop', function() {
  it('basic times loop works', function() {
    var program = dedent(`
                         4 times
                         \tbox(4)
                         `);
    var parsed = parser.parse(program);

    var expected = Block([
      Times(Num(4), Block([Application(Variable('box'), [Num(4)])])),
    ]);
    assert.deepEqual(parsed, expected);
  });

  it('times loop with variable', function() {
    var program = dedent(`
                         4 times with i
                         \tbox(4)
                         `);
    var parsed = parser.parse(program);

    var expected = Block([
      Times(Num(4), Block([Application(Variable('box'), [Num(4)])]), 'i'),
    ]);
    assert.deepEqual(parsed, expected);
  });

  it('times loop with variable number and loopvar', function() {
    var program = dedent(`
                         foo = 100
                         foo times with i
                         \tbox(4)
                         `);
    var parsed = parser.parse(program);

    var expected = Block([
      Assignment(Variable('foo'), Num(100)),
      Times(
        Variable('foo'),
        Block([Application(Variable('box'), [Num(4)])]),
        'i'
      ),
    ]);
    assert.deepEqual(parsed, expected);
  });

  it('times loop can be inlined', function() {
    var program = dedent('4 times 3 times box');
    var parsed = parser.parse(program);

    var expected = Block([
      Times(
        Num(4),
        Block([Times(Num(3), Block([Application(Variable('box'), [])]))])
      ),
    ]);
    assert.deepEqual(parsed, expected);
  });
});
