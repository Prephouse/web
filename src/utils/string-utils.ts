export const hasSimilarPathname = function hasSimiliarPathnames(pathname1: string, pathname2: string) {
  return !/^.*\/:.*$/i.test(pathname1) && (pathname2.includes(pathname1) || pathname1.includes(pathname2));
};

export const findClosestPathname = function findClosestPathname(
  pathnames: Record<string, string>,
  onFoundClosestPathname: (res: string | null) => any
) {
  let res: string | null = null;
  for (const pathname of Object.values(pathnames)) {
    if (pathname !== '/' && hasSimilarPathname(pathname, window.location.pathname)) {
      res = pathname;
      break;
    }
  }
  onFoundClosestPathname(res);
};
