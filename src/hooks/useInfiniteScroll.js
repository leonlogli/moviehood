import { useRef, useEffect } from "react";

/**
 * An infinite scroller based on Intersection Observer API.
 * Every time the loader is `N`px to be shown, trigger `onLoadMore` function to load new data.
 *
 * @param {Object} options options
 * @param {Function} options.onLoadMore The callback function a function which must be called after
 *    reaching the bottom. It must trigger some sort of action which fetches the next data
 * @param {boolean} options.hasMore The observer will disconnect when there are no more data to load.
 * * @param {boolean} [options.initialLoad=true] Whether to call `onLoadMore` function on initial render.
 * @param {boolean} [options.init=true] Whether the component should load the first set of items
 * @param {number} [options.threshold=250] The distance in px before the end of the items that will trigger a call to `onLoadMore`
 */
function useInfiniteScroll({
  hasMore,
  onLoadMore,
  threshold = 250,
  initialLoad = true,
}) {
  const scrollerRef = useRef();
  const loaderRef = useRef();
  const runCount = useRef(0);

  const onLoadMoreRef = useRef();
  onLoadMoreRef.current = onLoadMore;

  useEffect(() => {
    runCount.current++;
  });

  useEffect(() => {
    const loader = loaderRef.current;
    const scroller = scrollerRef?.current;

    if (!loader || !hasMore || !onLoadMoreRef.current) return;

    const options = {
      root: scroller,
      rootMargin: `0px 0px ${threshold}px 0px`,
    };

    let previousY;
    let previousRatio = 0;

    const listener = (entries) => {
      entries.forEach((entry) => {
        const {
          isIntersecting,
          intersectionRatio,
          boundingClientRect = {},
        } = entry;

        const canLoadMore =
          isIntersecting &&
          intersectionRatio >= previousRatio &&
          (!previousY || boundingClientRect.y < previousY);

        if (canLoadMore) {
          if (initialLoad) {
            onLoadMoreRef.current();
          } else if (runCount.current > 2) {
            onLoadMoreRef.current();
          }
        }

        previousY = boundingClientRect.y;
        previousRatio = intersectionRatio;
      });
    };

    const observer = new IntersectionObserver(listener, options);
    observer.observe(loader);

    return () => observer.disconnect();
  }, [hasMore, initialLoad, threshold]);

  return { loaderRef, scrollerRef };
}

export { useInfiniteScroll };
export default useInfiniteScroll;
