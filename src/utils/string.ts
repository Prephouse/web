/**
 * Determines whether two pathname can be treated as 'similar'
 * @param pathname1
 * @param pathname2
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
