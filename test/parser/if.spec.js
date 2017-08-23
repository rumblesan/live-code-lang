/* global describe, it */

import parser from 'grammar/lcl';
import {
  Application,
  Assignment,
  BinaryOp,
  Block,
  If,
  Num,
  Variable,
} from 'ast';

import { dedent } from 'dentist';

import assert from 'assert';

describe('If', function() {
  it('simple if statement parses', function() {
    var program = dedent(`
                         a = 3

                         if (a == 3)
                         \tbox
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['box'],
      inlibaleFunctions: ['box'],
    });

    var expected = Block([
      Assignment('a', Num(3)),
      If(
        BinaryOp('==', Variable('a'), Num(3)),
        Block([Application('box', [])])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('simple inline if statement parses', function() {
    var program = dedent(`
                         a = 3

                         if (a == 3) then box

                         `);
    var parsed = parser.parse(program, {
      functionNames: ['box'],
      inlibaleFunctions: ['box'],
    });

    var expected = Block([
      Assignment('a', Num(3)),
      If(
        BinaryOp('==', Variable('a'), Num(3)),
        Block([Application('box', [])])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('if else statement parses', function() {
    var program = dedent(`
                         a = 3
                         if a == 3
                         \tbox
                         else
                         \tpeg
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['box', 'peg'],
      inlinableFunctions: ['box', 'peg'],
    });

    var expected = Block([
      Assignment('a', Num(3)),
      If(
        BinaryOp('==', Variable('a'), Num(3)),
        Block([Application('box', [])]),
        If(Num(1), Block([Application('peg', [])]))
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('inline if else statement parses', function() {
    var program = dedent(`
                         a = 3
                         if a == 3 then box else peg 1
                         box
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['box', 'peg'],
      inlinableFunctions: ['box', 'peg'],
    });

    var expected = Block([
      Assignment('a', Num(3)),
      If(
        BinaryOp('==', Variable('a'), Num(3)),
        Block([Application('box', [])]),
        Block([Application('peg', [Num(1)])])
      ),
      Application('box', []),
    ]);

    assert.deepEqual(parsed, expected);
  });
  it('if ifelse else statement parses', function() {
    var program = dedent(`
                         a = 3
                         if a == 1
                         \tbox
                         else if a == 2
                         \tball
                         else
                         \tpeg
                         `);
    var parsed = parser.parse(program, {
      functionNames: ['box', 'peg', 'ball'],
      inlinableFunctions: ['box', 'peg', 'ball'],
    });

    var expected = Block([
      Assignment('a', Num(3)),
      If(
        BinaryOp('==', Variable('a'), Num(1)),
        Block([Application('box', [])]),
        If(
          BinaryOp('==', Variable('a'), Num(2)),
          Block([Application('ball', [])]),
          If(Num(1), Block([Application('peg', [])]))
        )
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('if else statement parses inside a block', function() {
    var program = dedent(`
                         rotate
                         \tif 1
                         \t\tbox
                         \telse
                         \t\tpeg`);
    var parsed = parser.parse(program, {
      functionNames: ['box', 'peg', 'rotate'],
      inlinableFunctions: ['box', 'peg', 'rotate'],
    });

    var expected = Block([
      Application(
        'rotate',
        [],
        Block([
          If(
            Num(1),
            Block([Application('box', [])]),
            If(Num(1), Block([Application('peg', [])]))
          ),
        ])
      ),
    ]);

    assert.deepEqual(parsed, expected);
  });

  it('if with time and modulo', function() {
    var program = dedent(`
                         if time % 10 < 5
                         \tambientLight 255, 255, 255
                         rotate
                         \tbox`);
    var parsed = parser.parse(program, {
      functionNames: ['ambientLight', 'box', 'rotate'],
      inlinableFunctions: ['box', 'rotate'],
    });

    var expected = Block([
      If(
        BinaryOp('<', BinaryOp('%', Variable('time'), Num(10)), Num(5)),
        Block([Application('ambientLight', [Num(255), Num(255), Num(255)])])
      ),
      Application('rotate', [], Block([Application('box', [])])),
    ]);

    assert.deepEqual(parsed, expected);
  });
});
