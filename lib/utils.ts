import type { Constant, Expression, Value } from "./interface";

export const isExpression = (value: Value): value is Expression => {
  return (
    Array.isArray(value) && value.length >= 2 && typeof value[0] === "string"
  );
};

export const isConstant = (value: Value): value is Constant => {
  return ["string", "number", "boolean"].includes(typeof value);
};
