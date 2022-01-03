export function hasSimilarPathname(pathname1: string, pathname2: string) {
  return (
    !/^.*\/:.*$/i.test(pathname1) &&
    (pathname2.includes(pathname1) || pathname1.includes(pathname2))
  );
}

export function findClosestPathname(
  currPath: string,
  possiblePaths: Record<string, string>,
  onFoundClosestPathname: (res: string | undefined) => void
) {
  onFoundClosestPathname(
    Object.values(possiblePaths).find(p => p !== '/' && hasSimilarPathname(p, currPath))
  );
}
