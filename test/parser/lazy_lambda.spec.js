/* global describe, it */

import parser from 'grammar/lcl';
import { Application, Assignment, Block, Lambda, Num, Variable } from 'ast';

import { dedent } from 'dentist';

import assert from 'assert';

describe('Lazy Lambda', function() {
  it('lazy lambda is parsed', function() {
    var program = 'foo = <box 3, 4>';
    var parsed = parser.parse(program, {
      functionNames: ['box'],
      inlinableFunctions: ['box'],
    });

    var expected = Block([
      Assignment(
        Variable('foo'),
        Lambda(
          [],
          Block([Application(Variable('box'), [Num(3), Num(4)])]),
          true
        )
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('lazy lambda is created and used', function() {
    var program = dedent(`
                         foo = <box 3, 4>
                         rotate
                         \tfoo
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['rotate', 'box'],
      inlinableFunctions: ['rotate', 'box'],
    });

    var expected = Block([
      Assignment(
        Variable('foo'),
        Lambda(
          [],
          Block([Application(Variable('box'), [Num(3), Num(4)])]),
          true
        )
      ),
      Application(
        Variable('rotate'),
        [],
        Block([Application(Variable('foo'), [])])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('lazy lambda is inlinable', function() {
    var program = dedent(`
                         bigger = <scale 1.1>
                         rotate bigger box
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['rotate', 'box', 'scale'],
      inlinableFunctions: ['rotate', 'box', 'scale'],
    });

    var expected = Block([
      Assignment(
        Variable('bigger'),
        Lambda([], Block([Application(Variable('scale'), [Num(1.1)])]), true),
        true
      ),
      Application(
        Variable('rotate'),
        [],
        Block([
          Application(
            Variable('bigger'),
            [],
            Block([Application(Variable('box'), [])])
          ),
        ])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });
});
