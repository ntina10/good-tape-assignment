import { useState, useEffect, useMemo, useRef } from "react";
import type { HNStory, HNStoryType } from "../types";
import { fetchStoryIds, fetchStoriesByIds } from "../services/hn-api";

export const useTopStories = (
  storyType: HNStoryType = "top",
  limit: number = 10,
) => {
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [storiesById, setStoriesById] = useState<Record<number, HNStory | null>>(
    {},
  );
  const [totalCount, setTotalCount] = useState(0);
  const [isIdsLoading, setIsIdsLoading] = useState<boolean>(true);
  const [isStoriesLoading, setIsStoriesLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number | undefined>();
  const [error, setError] = useState<string | null>(null);
  const idsAbortControllerRef = useRef<AbortController | null>(null);
  const storiesAbortControllerRef = useRef<AbortController | null>(null);
  const idsRequestIdRef = useRef(0);
  const storiesRequestIdRef = useRef(0);

  const visibleIds = useMemo(
    () => storyIds.slice(0, limit),
    [storyIds, limit],
  );

  const stories = useMemo(
    () =>
      visibleIds.flatMap((id) => {
        const story = storiesById[id];
        return story ? [story] : [];
      }),
    [storiesById, visibleIds],
  );

  const missingVisibleIds = useMemo(
    () =>
      visibleIds.filter(
        (id) => !Object.prototype.hasOwnProperty.call(storiesById, id),
      ),
    [storiesById, visibleIds],
  );
  const hasPendingVisibleStories =
    error === null && visibleIds.length > 0 && missingVisibleIds.length > 0;

  useEffect(() => {
    idsAbortControllerRef.current?.abort();
    storiesAbortControllerRef.current?.abort();

    const controller = new AbortController();
    idsAbortControllerRef.current = controller;
    const requestId = idsRequestIdRef.current + 1;
    idsRequestIdRef.current = requestId;

    setStoryIds([]);
    setStoriesById({});
    setTotalCount(0);
    setError(null);
    setLoadingProgress(undefined);
    setIsIdsLoading(true);
    setIsStoriesLoading(false);

    void (async () => {
      try {
        const ids = await fetchStoryIds(storyType, controller.signal);

        if (controller.signal.aborted || requestId !== idsRequestIdRef.current) {
          return;
        }

        setStoryIds(ids);
        setTotalCount(ids.length);
      } catch (err) {
        if (controller.signal.aborted || requestId !== idsRequestIdRef.current) {
          return;
        }

        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        if (!controller.signal.aborted && requestId === idsRequestIdRef.current) {
          setIsIdsLoading(false);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [storyType]);

  useEffect(() => {
    storiesAbortControllerRef.current?.abort();

    if (missingVisibleIds.length === 0) {
      setIsStoriesLoading(false);
      setLoadingProgress(undefined);
      return;
    }

    const controller = new AbortController();
    storiesAbortControllerRef.current = controller;
    const requestId = storiesRequestIdRef.current + 1;
    storiesRequestIdRef.current = requestId;

    setError(null);
    setIsStoriesLoading(true);
    setLoadingProgress(0);

    void (async () => {
      try {
        const newStories = await fetchStoriesByIds(
          missingVisibleIds,
          (progress) => {
            if (
              controller.signal.aborted ||
              requestId !== storiesRequestIdRef.current
            ) {
              return;
            }

            setLoadingProgress(progress);
          },
          controller.signal,
        );

        if (
          controller.signal.aborted ||
          requestId !== storiesRequestIdRef.current
        ) {
          return;
        }

        setStoriesById((currentStories) => {
          let hasChanges = false;
          const nextStories = { ...currentStories };

          for (const [id, story] of Object.entries(newStories)) {
            const storyId = Number(id);

            if (nextStories[storyId] !== story) {
              nextStories[storyId] = story;
              hasChanges = true;
            }
          }

          return hasChanges ? nextStories : currentStories;
        });
      } catch (err) {
        if (
          controller.signal.aborted ||
          requestId !== storiesRequestIdRef.current
        ) {
          return;
        }

        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        if (
          !controller.signal.aborted &&
          requestId === storiesRequestIdRef.current
        ) {
          setIsStoriesLoading(false);
          setLoadingProgress(undefined);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [missingVisibleIds]);

  return {
    stories,
    totalCount,
    isLoading: isIdsLoading || isStoriesLoading || hasPendingVisibleStories,
    loadingProgress,
    error,
  };
};
