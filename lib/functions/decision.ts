import type { Constant } from '../interface';

export const negate = (value: Constant) => !value;
export const equalTo = (a: Constant, b: Constant) => a === b;
export const notEqualTo = (a: Constant, b: Constant) => a !== b;
export const lessThan = (a: string | number, b: string | number) => a < b;
export const lessThanOrEqual = (a: string | number, b: string | number) => a <= b;
export const greaterThan = (a: string | number, b: string | number) => a > b;
export const greaterThanOrEqual = (a: string | number, b: string | number) => a >= b;
export const all = (...values: Constant[]) =>
  values.reduce<boolean>((acc, curr) => acc && !!curr, true);
export const any = (...values: Constant[]) =>
  values.reduce<boolean>((acc, curr) => acc || !!curr, false);
export const ifElse = (...args: Constant[]) => {
  if (args.length < 3 || args.length % 2 !== 1)
    throw new Error("Invalid arguments for 'if' expression");

  let argIndex = 0;

  while (argIndex < args.length - 1) {
    const condition = args[argIndex];
    const output = args[argIndex + 1];

    if (condition) {
      return output;
    }

    argIndex += 2;
  }

  return args[args.length - 1];
};
