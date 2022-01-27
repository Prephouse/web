import { roundAsDecimal } from 'utils/math';

describe('Math utility functions', () => {
  it('round float to nearest 2 dp', () => {
    expect(roundAsDecimal(2.52619)).toEqual(2.53);
  });

  it('round float to nearest 3 dp', () => {
    expect(roundAsDecimal(2.52619, 3)).toEqual(2.526);
  });

  it('round integer to nearest 2 dp', () => {
    expect(roundAsDecimal(3)).toEqual(3);
  });
});
