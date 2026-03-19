import type { HNStory } from "../types";

type StoryCardProps = {
  story: HNStory;
};

export function StoryCard({ story }: StoryCardProps) {
  const date = new Date(story.time * 1000).toLocaleDateString();

  return (
    <a
      href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-neutral-hover transition-shadow duration-300"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
        {story.title}
      </h3>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <span className="font-semibold text-purple-700">
          {story.score} points
        </span>
        <span>&bull;</span>
        <span>by {story.by}</span>
        <span>&bull;</span>
        <span>{story.descendants ?? 0} comments</span>
        <span>&bull;</span>
        <span>{date}</span>
      </div>
    </a>
  );
}
