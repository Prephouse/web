import ValueError from 'errors/ValueError';

/**
 * Determines whether two pathname can be treated as 'similar'
 * @param pathname1 first pathname to compare
 * @param pathname2 second pathname to compare
 * @return `true` if sufficiently similar pathname; `false` otherwise
 */
export function hasSimilarPathname(pathname1: string, pathname2: string) {
  return (
    !/^.*\/:.*$/i.test(pathname1) &&
    (pathname2.includes(pathname1) || pathname1.includes(pathname2))
  );
}

/**
 * Finds the most similar pathname
 * @param currPath the pathname to find for similarity
 * @param possiblePaths a record of the paths to check for
 * @param onFoundClosestPathname callback called when the most similar pathname has been found
 */
export function findClosestPathname(
  currPath: string,
  possiblePaths: Record<string, string>,
  onFoundClosestPathname: (res: string | undefined) => void
) {
  onFoundClosestPathname(
    Object.values(possiblePaths).find(p => p !== '/' && hasSimilarPathname(p, currPath))
  );
}

/**
 * Parses a string strictly as a base 10 integer; unlike `parseInt`, this function does
 * **not** ignore trailing characters in the string
 * @param str the string to be parsed as an integer
 * @return parsed base 10 integer
 * @throws ValueError `str` cannot be parsed as an integer
 * @see https://google.github.io/styleguide/tsguide.html#type-coercion
 */
export function parseStrictDecInt(str: string) {
  const f = Number(str);
  if (Number.isNaN(f)) {
    throw new ValueError();
  }
  return Math.trunc(f);
}