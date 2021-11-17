export function hasSimilarPathname(pathname1: string, pathname2: string) {
  return (
    !/^.*\/:.*$/i.test(pathname1) &&
    (pathname2.includes(pathname1) || pathname1.includes(pathname2))
  );
}

export const findClosestPathname = function findClosestPathname(
  paths: Record<string, string>,
  onFoundClosestPathname: (res: string | null) => void
) {
  const res: string | null =
    Object.values(paths).find(
      pa => pa !== '/' && hasSimilarPathname(pa, window.location.pathname)
    ) ?? null;
  onFoundClosestPathname(res);
};
