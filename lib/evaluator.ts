import {
  all,
  any,
  equalTo,
  greaterThan,
  greaterThanOrEqual,
  ifElse,
  lessThan,
  lessThanOrEqual,
  negate,
  notEqualTo,
} from "./functions/decision";
import {
  abs,
  add,
  ceil,
  cos,
  divide,
  floor,
  log,
  max,
  min,
  multiply,
  power,
  remainder,
  round,
  sin,
  sqrt,
  subtract,
  tan,
} from "./functions/math";
import { concat, downcase, numberFormat, upcase } from "./functions/string";
import { bool, str } from "./functions/type";
import type { Data, Expression, Value } from "./interface";
import { isConstant, isExpression } from "./utils";

// prettier-ignore
const FUNCTIONS: Record<string, Function> = {
  "boolean": bool,
  "string": str,
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "%": remainder,
  "^": power,
  "sqrt": sqrt,
  "abs": abs,
  "sin": sin,
  "cos": cos,
  "tan": tan,
  "log": log,
  "floor": floor,
  "ceil": ceil,
  "round": round,
  "min": min,
  "max": max,
  "!": negate,
  "==": equalTo,
  "!=": notEqualTo,
  "<": lessThan,
  "<=": lessThanOrEqual,
  ">": greaterThan,
  ">=": greaterThanOrEqual,
  "all": all,
  "any": any,
  "if": ifElse,
  "concat": concat,
  "downcase": downcase,
  "upcase": upcase,
  "number-format": numberFormat
};

export const evalVal = (value: Value, data?: Data) => {
  if (isConstant(value)) {
    if (data && typeof value === "string") {
      const wildcardRegex = /^\$(\w+)$/;

      const match = wildcardRegex.exec(value);

      if (match && match[1]) {
        return data[match[1]];
      }
    }

    return value;
  }

  if (isExpression(value)) return evalExp(value, data);

  throw new Error("Value is not constant or expression");
};

const evalExp = (expression: Expression, data?: Data): Value => {
  const [name, ...args] = expression;

  const func = FUNCTIONS[name];

  if (!func) throw new Error("Invalid expression");

  return func(...args.map((arg) => evalVal(arg, data)));
};
