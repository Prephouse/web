import { partial, pipe } from 'utils/functools';

describe('Functional utility methods', () => {
  it('curries some simple function', () => {
    const foo = (x: number, y: number, z: number) => x + y + z;
    const bar = partial(foo, 1, 2);
    expect(bar(3)).toEqual(6);
  });

  it('pipes some simple operations', () => {
    const foo = (arg: number) => arg * 2;
    const bar = (arg: number) => `${arg}500`;
    const num = 3;
    expect(pipe(foo, bar)(num)).toEqual('6500');
  });
});
