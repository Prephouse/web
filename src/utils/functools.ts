// source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html

type Arr = readonly unknown[];

/**
 * Useful for currying; mostly equivalent in behaviour to the
 * {@link https://docs.python.org/3/library/functools.html#functools.partial|`partial`}
 * function in the functools Python module except the TS variant directly returns the partial
 * function rather than a partial object
 * @param f function to curry
 * @param headArgs curried arguments
 * @return the partial function
 * @author TypeScript team
 * @see https://javascript.info/currying-partials
 * @example
 *   const foo = (x: number, y: number, z: number) => x + y + z
 *   const bar = partial(1, 2)
 *   bar(3) // returns 6
 */
export function partial<T extends Arr, U extends Arr, R>(
  f: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs);
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// source: https://stackoverflow.com/questions/65319258/how-to-type-pipe-function-using-variadic-tuple-types-in-typescript-4

type Fn = (a: any) => any;

type Head<T extends any[]> = T extends [infer H, ...infer _] ? H : never;

type Last<T extends any[]> = T extends [infer _]
  ? never
  : T extends [...infer _, infer Tl]
  ? Tl
  : never;

type Allowed<T extends Fn[], Cache extends Fn[] = []> = T extends []
  ? Cache
  : T extends [infer Lst]
  ? Lst extends Fn
    ? Allowed<[], [...Cache, Lst]>
    : never
  : T extends [infer Fst, ...infer Lst]
  ? Fst extends Fn
    ? Lst extends Fn[]
      ? // @ts-ignore
        Head<Lst> extends Head<Parameters<Head<Lst>>>
        ? Allowed<Lst, [...Cache, Fst]>
        : never
      : never
    : never
  : never;

type FirstParameterOf<T extends Fn[]> = Head<T> extends Fn ? Head<Parameters<Head<T>>> : never;

type Return<T extends Fn[]> = Last<T> extends Fn ? ReturnType<Last<T>> : never;

/**
 * Perform a sequence of operations sequentially
 * @param args operation functions
 * @return return value of the final operation
 * @example
 *   const foo = (arg: number) => arg * 2
 *   const bar = (arg: number) => arg + '500'
 *   pipe(foo, bar)(3) // returns 6500
 */
export function pipe<
  T extends Fn,
  Fns extends T[],
  Allow extends {
    0: [never];
    1: [FirstParameterOf<Fns>];
  }[Allowed<Fns> extends never ? 0 : 1]
>(...args: [...Fns]): (...data: Allow) => Return<Fns>;

export function pipe<T extends Fn, Fns extends T[], Allow extends unknown[]>(...args: [...Fns]) {
  return (...data: Allow) => args.reduce((acc, elem) => elem(acc), data);
}

/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/ban-ts-comment */
