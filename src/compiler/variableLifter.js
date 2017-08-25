import { Assignment, Closure, Func, ClosedVarPosition, VarPosition } from 'ast';

import { ASSIGNMENT, CLOSURE, FUNC, VARIABLE } from 'ast/types';

import { astTransform, astTraverse } from 'ast/func';

function newVarScope(argNames, freeNames) {
  const vars = {};
  argNames.forEach((name, idx) => {
    vars[name] = idx;
  });
  const frees = {};
  freeNames.forEach((name, idx) => {
    frees[name] = idx;
  });
  return {
    vars,
    varNum: argNames.length,
    frees,
  };
}

export default function variableLifter(ast) {
  const initialState = newVarScope([], []);
  return astTransform(
    ast,
    {
      [VARIABLE]: (variable, transFuncs, state) => {
        if (state.vars[variable.identifier] !== undefined) {
          return VarPosition(state.vars[variable.identifier]);
        } else if (state.frees[variable.identifier] !== undefined) {
          return ClosedVarPosition(state.frees[variable.identifier]);
        }
        throw new Error(`Cannot find variable ${variable.identifier}`);
      },

      [ASSIGNMENT]: (assignment, transFuncs, state) => {
        const expr = astTraverse(assignment.expression, transFuncs, state);
        const variable = assignment.variable;
        if (state.vars[variable.identifier] !== undefined) {
          return Assignment(VarPosition(state.vars[variable.identifier]), expr);
        } else if (state.frees[variable.identifier] !== undefined) {
          return Assignment(
            ClosedVarPosition(state.frees[variable.identifier]),
            expr
          );
        }
        const varPos = state.varNum;
        state.varNum += 1;
        state.vars[variable.identifier] = varPos;
        return Assignment(VarPosition(varPos), expr);
      },

      [FUNC]: (func, transFuncs) => {
        const newScope = newVarScope(func.argNames, []);

        const newBody = astTraverse(func.body, transFuncs, newScope);

        return Func(func.name, func.argNames, newBody);
      },

      [CLOSURE]: (closure, transFuncs) => {
        const newScope = newVarScope(closure.argNames, closure.externalVars);

        const newBody = astTraverse(closure.body, transFuncs, newScope);

        return Closure(
          closure.name,
          closure.argNames,
          closure.externalVars,
          newBody
        );
      },
    },
    initialState
  );
}
