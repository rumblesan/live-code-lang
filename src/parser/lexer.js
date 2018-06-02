import * as canto34 from 'canto34';

const types = canto34.StandardTokenTypes;

const lexer = new canto34.Lexer({ languageName: 'live-code-lang' });

const newline = () => ({
  name: 'newline',
  regexp: /^\n[ \n]*/,
});

const identifier = () => ({
  name: 'identifier',
  regexp: /^[a-zA-Z][a-zA-Z0-9]*/,
});

const operator = () => ({
  name: 'operator',
  regexp: /^[*/+-]+/,
});

lexer.addTokenType(newline());
lexer.addTokenType(types.whitespace());

lexer.addTokenType(types.constant('return', 'return'));
lexer.addTokenType(types.constant('=>', 'function arrow'));
lexer.addTokenType(types.constant('=', 'assignment'));
lexer.addTokenType(types.comma());
lexer.addTokenType(types.openParen());
lexer.addTokenType(types.closeParen());
lexer.addTokenType(types.openBracket());
lexer.addTokenType(types.closeBracket());

lexer.addTokenType(operator());

lexer.addTokenType(types.floatingPoint());
lexer.addTokenType(types.integer());

lexer.addTokenType(identifier());

export default lexer;
