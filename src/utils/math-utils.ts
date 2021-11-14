export function round_as_decimal(num: number, dp = 2): number {
  return Math.round((num + Number.EPSILON) * 10 ** dp) / 10 ** dp;
}
