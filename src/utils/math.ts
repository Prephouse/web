/**
 * Accurately rounds a number to a certain number of decimal places
 * @param num number to round
 * @param dp number of decimal places to round to; default 2 d.p.
 * @return rounded decimal value
 * @example
 *    roundAsDecimal(2.52619)     // returns 2.53
 *    roundAsDecimal(2.52619, 3)  // returns 2.526
 */
export function roundAsDecimal(num: number, dp = 2): number {
  return Math.round((num + Number.EPSILON) * 10 ** dp) / 10 ** dp;
}
