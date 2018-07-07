import './polyfill';
import languageParser from './language/parser';
import languageLexer from './language/lexer';

const languageExports = {
  parser: languageParser,
  lexer: languageLexer,
};

import patternParser from './patterns/parser';
import patternLexer from './patterns/lexer';

const patternExports = {
  parser: patternParser,
  lexer: patternLexer,
};

import { interpret, stepInterpret } from './interpreter';

export default {
  language: languageExports,
  patterns: patternExports,
  interpret,
  stepInterpret,
};
