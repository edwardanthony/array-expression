export type Constant = string | number | boolean;
export type Expression = [string, Value, ...Value[]];
export type Value = Expression | Constant;

export type Data = {
  [s: string]: Constant;
};
