/* global describe, it */

import parser from 'language/parser';

import assert from 'assert';

describe('Loop', function() {
  it('can parse basic patterns', function() {
    const program = 'a = "bd sn"';
    const parsed = parser.parse(program);
    const events = parsed.elements[0].expression.value(0, 1);

    const expected = [
      { start: 0, end: 0.5, value: 'bd' },
      { start: 0.5, end: 1, value: 'sn' },
    ];
    assert.deepEqual(events, expected);
  });
});
