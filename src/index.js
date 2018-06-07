import './polyfill';
import parser from './parser';
import lexer from './parser/lexer';

import { interpret } from './interpreter';

export { parser, lexer, interpret };
