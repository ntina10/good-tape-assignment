import { useTopStories } from "../hooks/useTopStories";
import { StoryCard } from "./StoryCard";
import { Button } from "./Button";
import { RefreshCw } from "lucide-react";

export function StoryList() {
  const { stories, isLoading, error, refetch } = useTopStories(10);

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="font-sharp-medium text-[28px] leading-[34px] text-[color:var(--text-h)]">
          Top Stories
        </h2>

        <Button
          onClick={refetch}
          loading={isLoading}
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
