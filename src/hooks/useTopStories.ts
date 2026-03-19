import { useState, useEffect, useCallback, useRef } from "react";
import type { HNStory } from "../types";
import { fetchTopStories } from "../services/hn-api";

export const useTopStories = (limit: number = 10) => {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const loadStories = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTopStories(limit, controller.signal);

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
      }
    }
  }, [limit]);

  useEffect(() => {
    void loadStories();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadStories]);

  return { stories, isLoading, error, refetch: loadStories };
};
