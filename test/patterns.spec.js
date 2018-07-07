/* global describe, it */

import parser from 'patterns/parser';

import assert from 'assert';

describe('Patterns', function() {
  it('works with simple patterns', function() {
    const patStr = 'bd sn';
    const pattern = parser.parse(patStr);
    const events = pattern(0, 1);

    var expected = [
      { start: 0, end: 0.5, value: 'bd' },
      { start: 0.5, end: 1, value: 'sn' },
    ];
    assert.deepEqual(events, expected);
  });
  it('works with sub patterns', function() {
    const patStr = 'bd [sn hh] sn';
    const pattern = parser.parse(patStr);
    const events = pattern(0, 1);

    var expected = [
      { start: 0, end: 2 / 6, value: 'bd' },
      { start: 2 / 6, end: 3 / 6, value: 'sn' },
      { start: 3 / 6, end: 4 / 6, value: 'hh' },
      { start: 4 / 6, end: 1, value: 'sn' },
    ];
    assert.deepEqual(events, expected);
  });
  it('works with concurrent patterns', function() {
    const patStr = 'bd {sn hh} sn';
    const pattern = parser.parse(patStr);
    const events = pattern(0, 1);

    var expected = [
      { start: 0, end: 1 / 3, value: 'bd' },
      { start: 1 / 3, end: 2 / 3, value: 'sn' },
      { start: 1 / 3, end: 2 / 3, value: 'hh' },
      { start: 2 / 3, end: 1, value: 'sn' },
    ];
    assert.deepEqual(events, expected);
  });
});
