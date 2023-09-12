import type { Constant } from "../interface";

export const concat = (...args: Constant[]) => args.join("");
export const downcase = (str: string) => str.toLowerCase();
export const upcase = (str: string) => str.toUpperCase();
export const numberFormat = (
  number: number,
  minimumFractionDigits: number,
  maximumFractionDigits?: number
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(number);
};
