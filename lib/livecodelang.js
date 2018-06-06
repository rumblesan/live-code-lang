var livecodelang =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/canto34/dist/canto34.js":
/*!**********************************************!*\
  !*** ./node_modules/canto34/dist/canto34.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else { var mod; }
})(this, function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var util = {
		lang: {
			isNullOrUndefined: function isNullOrUndefined(x) {
				if (typeof x === "undefined") {
					return true;
				}

				if (x === null) {
					return true;
				}

				return false;
			}
		},
		extend: function extend() {
			// conparable to jquery's extend
			for (var i = 1; i < arguments.length; i++) {
				for (var key in arguments[i]) {
					if (arguments[i].hasOwnProperty(key)) arguments[0][key] = arguments[i][key];
				}
			}return arguments[0];
		}
	};

	var PatternDefinitionException = function (_Error) {
		_inherits(PatternDefinitionException, _Error);

		function PatternDefinitionException(message) {
			_classCallCheck(this, PatternDefinitionException);

			return _possibleConstructorReturn(this, (PatternDefinitionException.__proto__ || Object.getPrototypeOf(PatternDefinitionException)).call(this, message));
		}

		return PatternDefinitionException;
	}(Error);

	var LexerException = function (_Error2) {
		_inherits(LexerException, _Error2);

		function LexerException(message) {
			_classCallCheck(this, LexerException);

			return _possibleConstructorReturn(this, (LexerException.__proto__ || Object.getPrototypeOf(LexerException)).call(this, message));
		}

		return LexerException;
	}(Error);

	var ParserException = function (_Error3) {
		_inherits(ParserException, _Error3);

		function ParserException(message) {
			_classCallCheck(this, ParserException);

			return _possibleConstructorReturn(this, (ParserException.__proto__ || Object.getPrototypeOf(ParserException)).call(this, message));
		}

		return ParserException;
	}(Error);

	var Lexer = function () {
		function Lexer(options) {
			_classCallCheck(this, Lexer);

			var defaults = {
				languageName: "unnamedlanguage"
			};
			this.options = util.extend({}, defaults, options);
			this.tokenTypes = [];
		}

		_createClass(Lexer, [{
			key: "addTokenType",
			value: function addTokenType(tokenType) {

				if (!tokenType.name) {
					throw new PatternDefinitionException("Token types must have a 'name' property");
				}

				// FOR CONSIDERATION: for some tokens, the full 'consume' is required for correct interpretation
				// (eg, JSON strings with escaped character) but a regex will do for syntax highlighting. In this
				// situation, both are allowed but consume is used for lexing and regexp is used for language definition.
				// if (tokenType.regexp && tokenType.consume) {
				// 	throw new canto34.PatternDefinitionException("Token types cannot have both a 'regexp' pattern and 'consume' function.");
				// }

				if (!tokenType.regexp && !tokenType.consume) {
					throw new PatternDefinitionException("Token types must have a 'regexp' property or a 'consume' function");
				}

				if (tokenType.regexp && !(tokenType.regexp instanceof RegExp)) {
					throw new PatternDefinitionException("Token types 'regexp' property must be an instance of RegExp");
				}

				if (tokenType.consume && typeof tokenType.consume !== "function") {
					throw new PatternDefinitionException("Token types 'consume' property must be a function");
				}

				if (tokenType.interpret && typeof tokenType.interpret !== "function") {
					throw new PatternDefinitionException("Token types 'interpret' property must be a function");
				}
				this.tokenTypes.push(tokenType);
			}
		}, {
			key: "tokenize",
			value: function tokenize(content) {
				if (content === undefined) {
					throw new LexerException("No content provided");
				}

				if (this.tokenTypes.length === 0) {
					throw new LexerException("No token types defined");
				}

				var result = [];
				var consumed;
				var remaining = content;
				var tracker = new LineTracker();
				var tokenTypeLength = this.tokenTypes.length;
				var consumeResult;

				while (remaining.length > 0) {
					var somethingFoundThisPass = false;

					for (var i = 0; i < tokenTypeLength; i++) {
						var tokenType = this.tokenTypes[i];

						consumeResult = undefined;
						if (tokenType.consume) {
							// must have a consume function;
							consumeResult = tokenType.consume(remaining);
							// should have told us what it consumed;
							if (consumeResult.success) {
								if (remaining.indexOf(consumeResult.consumed) !== 0) {
									throw new LexerException("The consume function for " + tokenType.name + " failed to return the start of the remaining content at " + tracker.line + "." + tracker.character + " and instead returned " + consumeResult.consumed);
								} else {
									somethingFoundThisPass = true;
									consumed = consumeResult.consumed;
								}
							} else {
								continue;
							}
						} else {
							var match = tokenType.regexp.exec(remaining);
							if (match) {
								// we found a token! great. What did it say? We only
								// want to match at the start of the string
								if (match.index === 0) {
									somethingFoundThisPass = true;
									consumed = match[0];
								} else {
									continue;
								}
							} else {
								continue;
							}
						}

						//handle our new token
						if (tokenType.interpret) {
							content = tokenType.interpret(consumed);
						} else if (consumeResult && !util.lang.isNullOrUndefined(consumeResult.content)) {
							content = consumeResult.content;
						} else {
							content = consumed;
						}

						var token = {
							content: content,
							type: tokenType.name,
							line: tracker.line,
							character: tracker.character
						};

						if (!tokenType.ignore) {
							result.push(token);
						}

						remaining = remaining.substring(consumed.length);
						tracker.consume(consumed);
					}

					if (!somethingFoundThisPass) {
						var userPartOfString = remaining.substring(0, 15);
						var visibleUserPartOfString = userPartOfString.replace("\r", "\\r").replace("\t", "\\t").replace("\n", "\\n");
						throw new LexerException("No viable alternative at " + tracker.line + "." + tracker.character + ": '" + visibleUserPartOfString + "...'");
					}
				}

				return result;
			}
		}]);

		return Lexer;
	}();

	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
	}

	var StandardTokenTypes = function () {
		function StandardTokenTypes() {
			_classCallCheck(this, StandardTokenTypes);
		}

		_createClass(StandardTokenTypes, null, [{
			key: "constant",
			value: function constant(literal, name, role) {
				role = role || ["keyword"];
				return {
					name: name,
					regexp: new RegExp("^" + escapeRegExp(literal)),
					role: role
				};
			}
		}, {
			key: "floatingPoint",
			value: function floatingPoint() {
				return {
					name: "floating point",
					regexp: /(^-?\d*\.\d+)/,
					role: ["constant", "numeric"],
					interpret: function interpret(content) {
						return parseFloat(content);
					}
				};
			}
		}, {
			key: "integer",
			value: function integer() {
				return {
					name: "integer",
					regexp: /^-?\d+/,
					role: ["constant", "numeric"],
					interpret: function interpret(content) {
						return parseInt(content);
					}
				};
			}
		}, {
			key: "whitespace",
			value: function whitespace() {
				return {
					name: "whitespace",
					ignore: true,
					regexp: /^[ \t]+/
				};
			}
		}, {
			key: "whitespaceWithNewlines",
			value: function whitespaceWithNewlines() {
				return {
					name: "whitespace",
					ignore: true,
					regexp: /^[ \t\r\n]+/
				};
			}
		}, {
			key: "real",
			value: function real() {
				return {
					name: "real number",
					regexp: /^X/,
					role: ["constant", "numeric"]
				};
			}
		}, {
			key: "comma",
			value: function comma() {
				return this.constant(",", "comma", ["punctuation"]);
			}
		}, {
			key: "period",
			value: function period() {
				return this.constant(".", "period", ["punctuation"]);
			}
		}, {
			key: "star",
			value: function star() {
				return this.constant("*", "star", ["punctuation"]);
			}
		}, {
			key: "colon",
			value: function colon() {
				return this.constant(":", "colon", ["punctuation"]);
			}
		}, {
			key: "openParen",
			value: function openParen() {
				return this.constant("(", "open paren", ["punctuation"]);
			}
		}, {
			key: "closeParen",
			value: function closeParen() {
				return this.constant(")", "close paren", ["punctuation"]);
			}
		}, {
			key: "openBracket",
			value: function openBracket() {
				return this.constant("{", "open bracket", ["punctuation"]);
			}
		}, {
			key: "closeBracket",
			value: function closeBracket() {
				return this.constant("}", "close bracket", ["punctuation"]);
			}
		}, {
			key: "openSquareBracket",
			value: function openSquareBracket() {
				return this.constant("[", "open square bracket", ["punctuation"]);
			}
		}, {
			key: "closeSquareBracket",
			value: function closeSquareBracket() {
				return this.constant("]", "close square bracket", ["punctuation"]);
			}
		}, {
			key: "JsonString",
			value: function JsonString() {
				return {
					name: "string",
					regexp: /"(?:[^"\\]|\\.)*"/,
					consume: function consume(remaining) {
						var fail = { success: false };
						if (remaining.indexOf('"') !== 0) {
							return fail;
						}

						var content = '';
						var pos = 1;
						var ch;
						var finished = false;
						do {
							ch = remaining[pos];
							pos += 1;

							switch (ch) {
								case '"':
									finished = true;
									break;
								case '\\':
									var ch2 = remaining[pos];
									pos += 1;
									switch (ch2) {
										case '"':
											return fail;
										case "t":
											content += "\t";break;
										case "r":
											content += "\r";break;
										case "n":
											content += "\n";break;
										case "u":
											var unicodeDigits = remaining.substr(pos, 4);
											if (unicodeDigits.length != 4 || !/\d{4}/.test(unicodeDigits)) {
												content += "\\u";
											} else {
												pos += 4;
												var codePoint = parseInt(unicodeDigits, 10);
												var codePointString = String.fromCharCode(codePoint);
												content += codePointString;
											}
											break;
										default:
											// something like \q, which doesn't mean anything
											return fail;
									}
									break;
								default:
									content += ch;
									break;
							}
						} while (!finished);

						var consumed = remaining.substring(0, pos);

						var successResult = {
							success: true,
							consumed: consumed,
							content: content
						};
						return successResult;
					}
				};
			}
		}]);

		return StandardTokenTypes;
	}();

	var Parser = function () {
		function Parser() {
			_classCallCheck(this, Parser);
		}

		_createClass(Parser, [{
			key: "initialize",
			value: function initialize(tokens) {
				if (!tokens) {
					throw new ParserException("No tokens provided to the parser");
				}

				if (!(tokens instanceof Array)) {
					throw new ParserException("A non-array was provided to the parser instead of a token array");
				}

				this.tokens = tokens;
			}
		}, {
			key: "la1",
			value: function la1(tokenType) {
				if (this.eof()) {
					throw new ParserException("No tokens available");
				}

				return this.tokens[0].type == tokenType;
			}
		}, {
			key: "match",
			value: function match(tokenType) {

				if (this.eof()) {
					throw new ParserException("Expected " + tokenType + " but found EOF");
				}

				if (!this.la1(tokenType)) {
					throw new ParserException("Expected " + tokenType + " but found " + this.tokens[0].type + " at l" + this.tokens[0].line + "." + this.tokens[0].character);
				}

				return this.tokens.shift();
			}
		}, {
			key: "eof",
			value: function eof() {
				return this.tokens.length === 0;
			}
		}, {
			key: "expectEof",
			value: function expectEof() {
				if (!this.eof()) {
					throw new ParserException("Expected EOF but found " + this.tokens[0].type + " at l" + this.tokens[0].line + "." + this.tokens[0].character);
				}
			}
		}]);

		return Parser;
	}();

	var LineTracker = function () {
		function LineTracker() {
			_classCallCheck(this, LineTracker);

			this.line = 1;
			this.character = 1;
			this.justSeenSlashR = false;
		}

		_createClass(LineTracker, [{
			key: "consume",
			value: function consume(content) {

				for (var i = 0, len = content.length; i < len; i++) {
					if (content[i] == "\r") {
						this.line += 1;
						this.character = 1;
						this.justSeenSlashR = true;
					} else if (content[i] == "\n") {
						if (!this.justSeenSlashR) {
							this.line += 1;
						}
						this.character = 1;
						this.justSeenSlashR = false;
					} else {
						this.character += 1;
						this.justSeenSlashR = false;
					}
				}
			}
		}]);

		return LineTracker;
	}();

	exports.PatternDefinitionException = PatternDefinitionException;
	exports.LexerException = LexerException;
	exports.ParserException = ParserException;
	exports.Lexer = Lexer;
	exports.StandardTokenTypes = StandardTokenTypes;
	exports.Parser = Parser;
	exports.LineTracker = LineTracker;
});

/***/ }),

/***/ "./src/ast/index.js":
/*!**************************!*\
  !*** ./src/ast/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Null = Null;
exports.Block = Block;
exports.Assignment = Assignment;
exports.Application = Application;
exports.If = If;
exports.Lambda = Lambda;
exports.Times = Times;
exports.UnaryOp = UnaryOp;
exports.BinaryOp = BinaryOp;
exports.DeIndex = DeIndex;
exports.Num = Num;
exports.Variable = Variable;
exports.Str = Str;
exports.List = List;

var _types = __webpack_require__(/*! ./types */ "./src/ast/types.js");

/**
 */
function Null() {
  return {
    type: _types.NULL
  };
}

/**
 *  elements: [Element]
 */
function Block(elements) {
  return {
    type: _types.BLOCK,
    elements: elements
  };
}

/**
 *  variable: Variable
 *  expression: Expression
 */
function Assignment(variable, expression) {
  return {
    type: _types.ASSIGNMENT,
    variable: variable,
    expression: expression
  };
}

/**
 *  func: Identifier
 *  args: [Expression]
 */
function Application(func, args) {
  return {
    type: _types.APPLICATION,
    func: func,
    args: args
  };
}

/**
 *  predicate: Expression
 *  ifBlock:   Block
 *  elseBlock: Block
 */
function If(predicate, ifBlock) {
  var elseBlock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Null();

  return {
    type: _types.IF,
    predicate: predicate,
    ifBlock: ifBlock,
    elseBlock: elseBlock
  };
}

/**
 *  argNames:  [Identifier]
 *  body:      Block
 *  inlinable: Boolean
 */
function Lambda(argNames, body) {
  return {
    type: _types.LAMBDA,
    argNames: argNames,
    body: body
  };
}

/**
 *  number:  Expression
 *  block:   Block
 *  loopVar: Identifier
 */
function Times(number, block) {
  var loopVar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Null();

  return {
    type: _types.TIMES,
    number: number,
    block: block,
    loopVar: loopVar
  };
}

/**
 *  operation: String
 *  expr1: Expression
 */
function UnaryOp(operator, expr1) {
  return {
    type: _types.UNARYOP,
    operator: operator,
    expr1: expr1
  };
}

/**
 *  operation: String
 *  expr1: Expression
 *  expr2: Expression
 */
function BinaryOp(operator, expr1, expr2) {
  return {
    type: _types.BINARYOP,
    operator: operator,
    expr1: expr1,
    expr2: expr2
  };
}

/**
 *  collection: Expression
 *  index: Expression
 */
function DeIndex(collection, index) {
  return {
    type: _types.DEINDEX,
    collection: collection,
    index: index
  };
}

/**
 *  value: Number
 */
function Num(value) {
  return {
    type: _types.NUMBER,
    value: value
  };
}

/**
 *  value: Identifier
 */
function Variable(identifier) {
  return {
    type: _types.VARIABLE,
    identifier: identifier
  };
}

/**
 *  value: String
 */
function Str(value) {
  return {
    type: _types.STRING,
    value: value
  };
}

/**
 *  value: List
 */
function List(values) {
  return {
    type: _types.LIST,
    values: values
  };
}

/***/ }),

/***/ "./src/ast/types.js":
/*!**************************!*\
  !*** ./src/ast/types.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var APPLICATION = exports.APPLICATION = 'APPLICATION';
var ASSIGNMENT = exports.ASSIGNMENT = 'ASSIGNMENT';
var BINARYOP = exports.BINARYOP = 'BINARYOP';
var BLOCK = exports.BLOCK = 'BLOCK';
var DEINDEX = exports.DEINDEX = 'DEINDEX';
var IF = exports.IF = 'IF';
var LAMBDA = exports.LAMBDA = 'LAMBDA';
var LIST = exports.LIST = 'LIST';
var NUMBER = exports.NUMBER = 'NUMBER';
var NULL = exports.NULL = 'NULL';
var STRING = exports.STRING = 'STRING';
var TIMES = exports.TIMES = 'TIMES';
var UNARYOP = exports.UNARYOP = 'UNARYOP';
var VARIABLE = exports.VARIABLE = 'VARIABLE';

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lexer = exports.parser = undefined;

var _parser = __webpack_require__(/*! ./parser */ "./src/parser/index.js");

var _parser2 = _interopRequireDefault(_parser);

var _lexer = __webpack_require__(/*! ./parser/lexer */ "./src/parser/lexer.js");

var _lexer2 = _interopRequireDefault(_lexer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.parser = _parser2.default;
exports.lexer = _lexer2.default;

/***/ }),

/***/ "./src/parser/index.js":
/*!*****************************!*\
  !*** ./src/parser/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canto = __webpack_require__(/*! canto34 */ "./node_modules/canto34/dist/canto34.js");

var _ast = __webpack_require__(/*! ../ast */ "./src/ast/index.js");

var ast = _interopRequireWildcard(_ast);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }

  _createClass(Parser, [{
    key: 'initialize',
    value: function initialize(tokens) {
      if (!tokens) {
        throw new _canto.ParserException('No tokens provided to the parser');
      }

      if (!(tokens instanceof Array)) {
        throw new _canto.ParserException('A non-array was provided to the parser instead of a token array');
      }

      this.tokens = tokens;
    }
  }, {
    key: 'la1',
    value: function la1(tokenType) {
      if (this.eof()) {
        throw new _canto.ParserException('No tokens available');
      }

      return this.tokens[0].type == tokenType;
    }
  }, {
    key: 'lan',
    value: function lan(n, tokenType) {
      if (this.eof()) {
        throw new _canto.ParserException('No tokens available');
      }

      return this.tokens[n - 1].type == tokenType;
    }
  }, {
    key: 'match',
    value: function match(tokenType) {
      if (this.eof()) {
        throw new _canto.ParserException('Expected ' + tokenType + ' but found EOF');
      }

      if (!this.la1(tokenType)) {
        throw new _canto.ParserException('Expected ' + tokenType + ' but found ' + this.tokens[0].type + ' at l' + this.tokens[0].line + '.' + this.tokens[0].character);
      }

      return this.tokens.shift();
    }
  }, {
    key: 'eof',
    value: function eof() {
      return this.tokens.length === 0;
    }
  }, {
    key: 'expectEof',
    value: function expectEof() {
      if (!this.eof()) {
        throw new _canto.ParserException('Expected EOF but found ' + this.tokens[0].type + ' at l' + this.tokens[0].line + '.' + this.tokens[0].character);
      }
    }
  }]);

  return Parser;
}();

var parser = new Parser();

parser.body = function () {
  var result = [];
  if (this.la1('newline')) {
    this.match('newline');
  }
  while (!this.eof()) {
    result.push(this.statement());
    this.newline();
  }
  return result;
};

parser.statement = function () {
  if (this.lan(2, 'open paren')) {
    return this.application();
  }
  if (this.lan(2, 'assignment')) {
    return this.assignment();
  }
  throw new _canto.ParserException('Could not parse either application or assignment');
};

parser.assignment = function () {
  var name = this.match('identifier').content;
  this.match('assignment');
  var expr = this.expression();
  return ast.Assignment(name, expr);
};

parser.application = function () {
  var name = this.match('identifier').content;
  this.match('open paren');
  var args = this.argList();
  this.match('close paren');
  this.result.push(ast.Application(name, args));
};

parser.argList = function () {
  var args = [];
  if (this.la1('close paren')) {
    return args;
  }
  args.push(this.expression());
  while (this.la1('comma')) {
    this.match('comma');
    args.push(this.expression());
  }
  return args;
};

parser.expression = function () {
  var expr1 = void 0;
  if (this.la1('floating point')) {
    expr1 = ast.Num(this.match('floating point'));
  } else if (this.la1('integer')) {
    expr1 = ast.Num(this.match('integer'));
  } else if (this.la1('name') && this.lan(2, 'open paren')) {
    expr1 = this.application();
  } else if (this.la1('name')) {
    expr1 = ast.Variable(this.match('name'));
  } else if (this.la1('open paren')) {
    expr1 = this.lambda();
  }
  if (!this.la1('operator')) {
    return expr1;
  }
  var operator = this.match('operator');
  var expr2 = this.expression();
  return ast.BinaryOp(operator, expr1, expr2);
};

parser.lambda = function () {
  this.match('open paren');
  var argNames = this.nameList();
  this.match('close paren');
  this.match('function arrow');
  this.match('open bracket');
  var body = this.body();
  this.match('close bracket');
  return ast.Lambda(argNames, body);
};

parser.nameList = function () {
  var names = [];
  if (this.la1('close paren')) {
    return names;
  }
  names.push(this.match('name'));
  while (this.la1('comma')) {
    this.match('comma');
    names.push(this.match('name'));
  }
  return names;
};

exports.default = parser;

/***/ }),

/***/ "./src/parser/lexer.js":
/*!*****************************!*\
  !*** ./src/parser/lexer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canto = __webpack_require__(/*! canto34 */ "./node_modules/canto34/dist/canto34.js");

var canto34 = _interopRequireWildcard(_canto);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var types = canto34.StandardTokenTypes;

var lexer = new canto34.Lexer({ languageName: 'live-code-lang' });

var newline = function newline() {
  return {
    name: 'newline',
    regexp: /^(\n)+[ \n]*/
  };
};

var identifier = function identifier() {
  return {
    name: 'identifier',
    regexp: /^[a-zA-Z][a-zA-Z0-9]*/
  };
};

var operator = function operator() {
  return {
    name: 'operator',
    regexp: /^[*/+-]*/
  };
};

lexer.addToken(newline);
lexer.addToken(types.whitespace());

lexer.addToken(types.constant('=', 'assignment'));
lexer.addToken(types.comma());
lexer.addToken(types.constant('=>', 'function arrow'));
lexer.addToken(types.openParen());
lexer.addToken(types.closeParen());
lexer.addToken(types.openBracket());
lexer.addToken(types.closeBracket());

lexer.addToken(operator());

lexer.addToken(types.integer());
lexer.addToken(types.floatingPoint());

lexer.addToken(identifier);

exports.default = lexer;

/***/ })

/******/ });
//# sourceMappingURL=livecodelang.js.map