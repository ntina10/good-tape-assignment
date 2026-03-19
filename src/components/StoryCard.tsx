import { MessageSquareText, Star, UserRound } from "lucide-react";
import type { HNStory } from "../types";

type StoryCardProps = {
  story: HNStory;
};

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

const formatStoryTime = (timestamp: number) => {
  const storyDate = new Date(timestamp * 1000);
  const now = new Date();
  const isToday = storyDate.toDateString() === now.toDateString();

  if (!isToday) {
    return storyDate.toLocaleDateString();
  }

  const diffInSeconds = Math.floor(
    (storyDate.getTime() - now.getTime()) / 1000,
  );
  const absDiffInSeconds = Math.abs(diffInSeconds);

  if (absDiffInSeconds < 60) {
    return "just now";
  }

  if (absDiffInSeconds < 3600) {
    return relativeTimeFormatter.format(
      Math.round(diffInSeconds / 60),
      "minute",
    );
  }

  return relativeTimeFormatter.format(Math.round(diffInSeconds / 3600), "hour");
};

export function StoryCard({ story }: StoryCardProps) {
  const date = formatStoryTime(story.time);

  return (
    <a
      href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-full min-h-[123px] flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-neutral-hover`}
    >
      <h3 className="mb-8 font-sharp-medium text-display text-gray-900">
        {story.title}
      </h3>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
        <span className="inline-flex items-center gap-2 font-mono-brand text-purple-700">
          <Star className="h-4 w-4 fill-current" />
          {story.score} points
        </span>
        <span className="inline-flex items-center gap-2">
          <UserRound className="h-4 w-4 text-gray-400" />
          {story.by}
        </span>
        <span className="inline-flex items-center gap-2">
          <MessageSquareText className="h-4 w-4 text-gray-400" />
          {story.descendants ?? 0} comments
        </span>
        <div className="ml-auto text-right font-sharp-book text-body-small italic text-gray-500">
          {date}
        </div>
      </div>
    </a>
  );
}

export function StoryCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className={`flex h-full min-h-[123px] flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm animate-pulse`}
    >
      <div className="mb-8 h-[30px] w-11/12 rounded-full bg-gray-100" />

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="h-[21px] w-24 rounded-full bg-purple-100" />
        <div className="h-[21px] w-20 rounded-full bg-gray-100" />
        <div className="h-[21px] w-24 rounded-full bg-gray-100" />
        <div className="ml-auto h-[21px] w-16 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}
