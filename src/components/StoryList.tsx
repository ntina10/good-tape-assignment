import { useState } from "react";
import { useTopStories } from "../hooks/useTopStories";
import { StoryCard } from "./StoryCard";
import { Button } from "./Button";
import { RefreshCw } from "lucide-react";
import type { HNStoryType } from "../types";
import { cn } from "../utils/cn";

const FEED_ORDER: HNStoryType[] = ["top", "new", "best"];

const FEED_LABELS: Record<HNStoryType, string> = {
  top: "Top",
  new: "New",
  best: "Best",
};

export function StoryList() {
  const [activeFeed, setActiveFeed] = useState<HNStoryType>("top");
  const { stories, isLoading, loadingProgress, error, refetch } = useTopStories(
    activeFeed,
    10,
  );

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          aria-label="Story feeds"
          className="inline-flex w-fit justify-self-start rounded-full border border-gray-200 bg-white/90 p-1 shadow-sm"
          role="tablist"
        >
          {FEED_ORDER.map((feed) => {
            const isActive = feed === activeFeed;

            return (
              <button
                aria-selected={isActive}
                className={cn(
                  "rounded-full px-4 py-2 font-sharp-medium font-sharp-book transition duration-300",
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                )}
                disabled={isLoading}
                key={feed}
                onClick={() => setActiveFeed(feed)}
                role="tab"
                type="button"
              >
                {FEED_LABELS[feed]}
              </button>
            );
          })}
        </div>

        <Button
          onClick={refetch}
          loading={isLoading}
          progress={loadingProgress}
          className="flex items-center gap-2 !px-4 !py-2 !text-sm"
          shadow="tint"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">
          Error: {error}
        </div>
      ) : null}

      {isLoading && stories.length === 0 ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : stories.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 font-sharp-book text-body text-[color:var(--text)]">
          No stories are available right now.
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
