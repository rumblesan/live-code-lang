/* global describe, it */

import parser from 'grammar/lcl';
import { Application, BinaryOp, Block, Num, Times, Variable } from 'ast';

import { dedent } from 'dentist';

import assert from 'assert';

describe('Parser', function() {
  it('always returns a block, even with an empty program', function() {
    var program = '';
    var parsed = parser.parse(program, {});

    var expected = Block([]);

    assert.deepEqual(parsed, expected);
  });

  it('basic function calls work', function() {
    var program = dedent(`

                         box
                         `);
    var parsed = parser.parse(program, { functionNames: ['box'] });

    var expected = Block([Application(Variable('box'), [])]);

    assert.deepEqual(parsed, expected);
  });

  it('primitive with args and block', function() {
    var program = dedent(`
                         rotate 2, 3
                         \tbox

                         `);
    var parsed = parser.parse(program, {
      functionNames: ['rotate', 'box'],
      inlinableFunctions: ['rotate', 'box'],
    });

    var expected = Block([
      Application(
        Variable('rotate'),
        [Num(2), Num(3)],
        Block([Application(Variable('box'), [])])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('inline calls', function() {
    var program = dedent(`
                         rotate 2, 3 >> box
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['rotate', 'box'],
      inlinableFunctions: ['rotate', 'box'],
    });

    var expected = Block([
      Application(
        Variable('rotate'),
        [Num(2), Num(3)],
        Block([Application(Variable('box'), [])])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('multiple inline calls', function() {
    var program = dedent(`rotate 2, 3 >> fill red >> box
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['rotate', 'fill', 'box'],
      inlinableFunctions: ['rotate', 'fill', 'box'],
    });

    var expected = Block([
      Application(
        Variable('rotate'),
        [Num(2), Num(3)],
        Block([
          Application(
            Variable('fill'),
            [Variable('red')],
            Block([Application(Variable('box'), [])])
          ),
        ])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('multiple inline calls with no arrows', function() {
    var program = dedent(`
                         rotate 2, 3 fill red box
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['rotate', 'fill', 'box'],
      inlinableFunctions: ['rotate', 'fill', 'box'],
    });

    var expected = Block([
      Application(
        Variable('rotate'),
        [Num(2), Num(3)],
        Block([
          Application(
            Variable('fill'),
            [Variable('red')],
            Block([Application(Variable('box'), [])])
          ),
        ])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('more complex inline function calls', function() {
    var program = dedent(`
                         scale 2, wave 2 peg
                         \tscale 2, wave 2 ball
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['scale', 'wave', 'peg', 'ball'],
      inlinableFunctions: ['scale', 'peg', 'ball'],
    });

    var expected = Block([
      Application(
        Variable('scale'),
        [Num(2), Application(Variable('wave'), [Num(2)])],
        Block([
          Application(
            Variable('peg'),
            [],
            Block([
              Application(
                Variable('scale'),
                [Num(2), Application(Variable('wave'), [Num(2)])],
                Block([Application(Variable('ball'), [])])
              ),
            ])
          ),
        ])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('more complicated times loop inlining', function() {
    var program = 'rotate wave + 2 times box';
    var parsed = parser.parse(program, {
      functionNames: ['rotate', 'wave', 'box'],
      inlinableFunctions: ['rotate', 'box'],
    });

    var expected = Block([
      Application(
        Variable('rotate'),
        [],
        Block([
          Times(
            BinaryOp('+', Application(Variable('wave'), []), Num(2)),
            Block([Application(Variable('box'), [])])
          ),
        ])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });
});
