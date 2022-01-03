export function roundAsDecimal(num: number, dp = 2): number {
  return Math.round((num + Number.EPSILON) * 10 ** dp) / 10 ** dp;
}
