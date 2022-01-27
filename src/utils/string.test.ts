import ValueError from 'errors/ValueError';

import { hasSimilarPathname, parseStrictDecInt } from 'utils/string';

describe('String utility functions', () => {
  it('checks whether two paths have similar names', () => {
    expect(hasSimilarPathname('/test', '/test2')).toBeTruthy();
  });

  it('parses a valid string to a strict decimal integer', () => {
    expect(parseStrictDecInt('100')).toEqual(100);
  });

  it('parses an invalid string to a strict decimal integer', () => {
    expect(() => parseStrictDecInt('100 waterloo kids')).toThrowError(ValueError);
  });
});
