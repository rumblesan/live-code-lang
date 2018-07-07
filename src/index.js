import './polyfill';
import parser from './language/parser';
import lexer from './language/lexer';

import { interpret, stepInterpret } from './interpreter';

export { parser, lexer, interpret, stepInterpret };
