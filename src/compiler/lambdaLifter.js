import {
  Null,
  Block,
  Assignment,
  Application,
  // If,
  Lambda,
  Func,
  Closure,
  // Times,
  // DoOnce,
  // UnaryOp,
  // BinaryOp,
  // DeIndex,
  // Num,
  Variable,
  GlobalVar,
  FuncPointer,
  ClosurePointer,
  // Str,
  // List,
} from 'ast';

import {
  // NULL,
  BLOCK,
  ASSIGNMENT,
  APPLICATION,
  // IF,
  LAMBDA,
  // TIMES,
  // DOONCE,
  // UNARYOP,
  // BINARYOP,
  // DEINDEX,
  // NUMBER,
  VARIABLE,
  // STRING,
  // LIST,
} from 'ast/types';

import { astTransform, astTraverse } from 'ast/func';

function genFuncName(idName, state) {
  state.funcNum += 1;
  return `func${idName}${state.funcNum}`;
}

function newStateScope(state, newScope) {
  const newParent = Object.create(state.parentScope);
  Object.assign(newParent, state.scope);

  return {
    funcNum: state.funcNum,
    globalFuncs: state.globalFuncs,
    globalVars: state.globalVars,
    liftedFuncs: state.liftedFuncs,
    scope: newScope,
    free: [],
    parentScope: newParent,
  };
}

export function lambdaLifter(ast, globalVars = {}, globalFuncs = {}) {
  const initialState = {
    funcNum: 0,
    globalFuncs,
    globalVars,
    liftedFuncs: {},
    parentScope: {},
    scope: {},
    free: [],
  };
  const liftedAst = astTransform(
    ast,
    {
      [VARIABLE]: (variable, transFuncs, state) => {
        if (state.scope[variable.identifier]) {
          return Variable(variable.identifier);
        } else if (state.globalVars[variable.identifier]) {
          return GlobalVar(variable.identifier);
        }
        state.free.push(variable.identifier);
        return Variable(variable.identifier);
      },

      [ASSIGNMENT]: (assignment, transFuncs, state) => {
        const expr = astTraverse(assignment.expression, transFuncs, state);
        let value = expr;

        if (expr.type === LAMBDA) {
          const funcName = genFuncName(assignment.variable.identifier, state);
          if (expr.freeVars.length === 0) {
            value = FuncPointer(funcName);
            state.liftedFuncs[funcName] = Func(
              funcName,
              expr.argNames,
              expr.body
            );
          } else {
            value = ClosurePointer(funcName, expr.freeVars);
            state.liftedFuncs[funcName] = Closure(
              funcName,
              expr.argNames,
              expr.freeVars,
              expr.body
            );
          }
        }

        if (state.parentScope[assignment.variable.identifier]) {
          // Assignment to variable outside this scope
          // Redefine it within this scope but make it clear that
          // this is a free variable
          state.free.push(assignment.variable.identifier);
        }
        state.scope[assignment.variable.identifier] = value;
        return Assignment(assignment.variable, value);
      },

      [APPLICATION]: (application, transFuncs, state) => {
        const args = application.args.map(a =>
          astTraverse(a, transFuncs, state)
        );
        if (state.scope[application.identifier]) {
          const fp = state.scope[application.identifier];
          // Locally defined lambda
          return Application(fp.funcName, args, application.block);
        } else if (state.globalFuncs[application.identifier]) {
          const fp = state.globalFuncs[application.identifier];
          // Locally defined lambda
          return Application(fp.funcName, args, application.block);
        } else {
          // We don't know where this function is....
          return Null();
        }
      },

      [LAMBDA]: (lambda, transFuncs, state) => {
        const newScope = lambda.argNames.reduce((s, name) => {
          s[name] = true;
          return s;
        }, {});
        const newState = newStateScope(state, newScope);

        const newBody = astTraverse(lambda.body, transFuncs, newState);
        state.funcNum = newState.funcNum;
        const freeVars = newState.free;

        freeVars.forEach(v => {
          if (!state.scope[v]) {
            state.free.push(v);
          }
        });

        return Lambda(lambda.argNames, newBody, lambda.inlinable, freeVars);
      },
    },
    initialState
  );

  if (liftedAst.type === BLOCK) {
    return Block(
      Object.values(initialState.liftedFuncs).concat(liftedAst.elements)
    );
  } else {
    return Block(Object.values(initialState.liftedFuncs).concat([liftedAst]));
  }
}
