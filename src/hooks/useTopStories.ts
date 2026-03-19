import { useState, useEffect, useCallback, useRef } from "react";
import type { HNStory, HNStoryType } from "../types";
import { fetchStories } from "../services/hn-api";

export const useTopStories = (
  storyType: HNStoryType = "top",
  limit: number = 10,
) => {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number | undefined>();
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const loadStories = useCallback(async (resetStories: boolean = false) => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setIsLoading(true);
    setLoadingProgress(undefined);
    setError(null);

    if (resetStories) {
      setStories([]);
    }

    try {
      const data = await fetchStories(
        storyType,
        limit,
        (progress) => {
          if (controller.signal.aborted || requestId !== requestIdRef.current) {
            return;
          }

          setLoadingProgress(progress);
        },
        controller.signal,
      );

      if (controller.signal.aborted || requestId !== requestIdRef.current) {
        return;
      }

      setStories(data);
    } catch (err) {
      if (controller.signal.aborted || requestId !== requestIdRef.current) {
        return;
      }

      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      if (!controller.signal.aborted && requestId === requestIdRef.current) {
        setIsLoading(false);
        setLoadingProgress(undefined);
      }
    }
  }, [limit, storyType]);

  useEffect(() => {
    void loadStories(true);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadStories]);

  const refetch = useCallback(() => {
    void loadStories();
  }, [loadStories]);

  return { stories, isLoading, loadingProgress, error, refetch };
};
