import * as canto34 from 'canto34';

const types = canto34.StandardTokenTypes;

const lexer = new canto34.Lexer({ languageName: 'plan' });

const value = () => ({
  name: 'value',
  regexp: /^[a-zA-Z][a-zA-Z0-9]*/,
});

lexer.addTokenType(types.whitespace());

lexer.addTokenType(types.constant('"', 'delimiter'));
lexer.addTokenType(types.constant('~', 'rest'));

lexer.addTokenType(types.openBracket());
lexer.addTokenType(types.closeBracket());
lexer.addTokenType(types.openSquareBracket());
lexer.addTokenType(types.closeSquareBracket());

lexer.addTokenType(value());

export default lexer;
