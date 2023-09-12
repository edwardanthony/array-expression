import type { Constant } from "../interface";

export const bool = (value: Constant) => !!value;
export const str = (value: Constant) => String(value);
