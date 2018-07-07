import { ParserException } from 'canto34';

import Parser from 'util/parser';
import lexer from './lexer';

const PATTERN = 'PATTERN';
const VALUE = 'VALUE';

const parser = new Parser();

parser.parse = function(string) {
  const tokens = lexer.tokenize(string);
  this.initialize(tokens);
  const pattern = this.pattern();
  if (pattern.type !== PATTERN) {
    throw new ParserException(`Expected Pattern but got ${pattern.type}`);
  }
  return pattern.value;
};

parser.values = function() {
  const values = [];

  while (
    !this.eof() &&
    !this.la1('close bracket') &&
    !this.la1('close square bracket')
  ) {
    if (this.la1('open bracket')) {
      this.match('open bracket');
      values.push(this.concurrent());
      this.match('close bracket');
    } else if (this.la1('open square bracket')) {
      this.match('open square bracket');
      values.push(this.pattern());
      this.match('close square bracket');
    } else {
      values.push(this.value());
    }
  }

  return values;
};

parser.pattern = function() {
  const values = this.values();

  const outVal = (start, end) => {
    const t = end - start;
    const delta = t / values.length;

    const events = [];
    for (let i = 0; i < values.length; i += 1) {
      const s = start + i * delta;
      const e = s + delta;
      const v = values[i];
      if (v.type === VALUE) {
        events.push({ start: s, end: e, value: v.value });
      } else if (v.type === PATTERN) {
        v.value(s, e).forEach(se => events.push(se));
      } else {
        throw new ParserException(
          `Expected Pattern or Valuea but got ${v.type}`
        );
      }
    }
    return events;
  };
  return { type: PATTERN, value: outVal };
};

parser.concurrent = function() {
  const values = this.values();
  const v = (start, end) =>
    values.map(v => ({ start: start, end: end, value: v.value }));
  return { type: PATTERN, value: v };
};

parser.value = function() {
  const v = this.match('value').content;
  return { type: VALUE, value: v };
};

export default parser;
