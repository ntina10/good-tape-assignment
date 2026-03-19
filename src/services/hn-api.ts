import type { HNStory, HNStoryType } from "../types";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const STORY_TYPE_PATHS: Record<HNStoryType, string> = {
  top: "topstories",
  new: "newstories",
  best: "beststories",
};

type HNItemResponse = {
  id: number;
  type?: string;
  title?: string;
  url?: string;
  score?: number;
  by?: string;
  time?: number;
  descendants?: number;
  deleted?: boolean;
  dead?: boolean;
} | null;

export type HNStoryLookup = Record<number, HNStory | null>;

export const fetchStoryIds = async (
  storyType: HNStoryType,
  signal?: AbortSignal,
): Promise<number[]> => {
  const response = await fetch(
    `${BASE_URL}/${STORY_TYPE_PATHS[storyType]}.json`,
    { signal },
  );
  if (!response.ok) throw new Error("Failed to fetch story IDs");
  return response.json();
};

export const fetchStory = async (
  id: number,
  signal?: AbortSignal,
): Promise<HNItemResponse> => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`, { signal });
  if (!response.ok) throw new Error(`Failed to fetch story: ${id}`);
  return response.json();
};

const isValidStory = (story: HNItemResponse): story is NonNullable<HNItemResponse> =>
  Boolean(
    story &&
      story.type === "story" &&
      !story.deleted &&
      !story.dead &&
      story.title &&
      story.by &&
      typeof story.time === "number",
  );

const mapStory = (story: NonNullable<HNItemResponse>): HNStory => ({
  id: story.id,
  title: story.title ?? "Untitled",
  url: story.url,
  score: story.score ?? 0,
  by: story.by ?? "unknown",
  time: story.time ?? 0,
  descendants: story.descendants ?? 0,
});

export const fetchStoriesByIds = async (
  ids: number[],
  onProgress?: (progress: number) => void,
  signal?: AbortSignal,
): Promise<HNStoryLookup> => {
  if (ids.length === 0) {
    onProgress?.(100);
    return {};
  }

  onProgress?.(0);
  let completedRequests = 0;
  const totalRequests = ids.length;

  const stories = await Promise.all(
    ids.map(async (id) => {
      try {
        const story = await fetchStory(id, signal);
        return [id, story] as const;
      } finally {
        completedRequests += 1;
        onProgress?.(Math.round((completedRequests / totalRequests) * 100));
      }
    }),
  );

  return Object.fromEntries(
    stories.map(([id, story]) => [id, isValidStory(story) ? mapStory(story) : null]),
  );
};
