import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { StoryList } from "../components/StoryList";

export function HackerNewsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(168,82,255,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(146,37,255,0.12),transparent_38%)] px-4 py-6 text-[color:var(--text-h)] sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-4 py-2 font-sharp-medium text-label text-purple-700 shadow-sm transition-colors duration-200 hover:bg-purple-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <section className="rounded-[32px] border border-white/70 bg-white/88 p-8 shadow-[0_24px_80px_rgba(109,86,146,0.12)] backdrop-blur">
          <div className="space-y-3">
            <p className="font-mono-brand text-header-small uppercase tracking-[0.18em] text-purple-600">
              Assignment Part Two
            </p>
            <h1 className="font-sharp-medium text-display text-[color:var(--text-h)] sm:text-[32px] sm:leading-[40px]">
              Hacker News
            </h1>
            <p className="max-w-2xl font-sharp-book text-body text-[color:var(--text)]">
              Browse top stories from the Hacker News API and open the ones you
              want to read in full.
            </p>
          </div>
        </section>

        <section className="w-full">
          <StoryList />
        </section>
      </div>
    </main>
  );
}
