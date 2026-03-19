# Good Tape Frontend Assignment

This project is a React + TypeScript + Vite solution for the two-part frontend assignment.

I approached it as:

- Part 1: build a reusable `Button` component with a small, clear API and polished state transitions.
- Part 2: build a simple Hacker News reader that reuses the same visual language and loading behavior.

The goal was to keep the code easy to follow, with most logic split into small components, a dedicated data hook, and a small API service layer.

## Tech stack

- React 19
- TypeScript
- Vite v8
- React Router
- Tailwind CSS v4
- Class Variance Authority (`cva`) for button variants
- Radix `Slot` for `asChild` support on the button

## How to run

```bash
npm install
npm run dev
```

Other useful scripts:

```bash
npm run build
npm run lint
npm run preview
```

## Where everything is

- [`src/main.tsx`](/Users/konstantinafreri/Documents/goodtape-task/src/main.tsx): app bootstrap, router setup, global styles import
- [`src/App.tsx`](/Users/konstantinafreri/Documents/goodtape-task/src/App.tsx): top-level routes
- [`src/index.css`](/Users/konstantinafreri/Documents/goodtape-task/src/index.css): theme tokens, fonts, shadows, typography scale

Part 1:

- [`src/components/Button.tsx`](/Users/konstantinafreri/Documents/goodtape-task/src/components/Button.tsx): reusable button component
- [`src/pages/HomePage.tsx`](/Users/konstantinafreri/Documents/goodtape-task/src/pages/HomePage.tsx): assignment/home page with the button examples, interactive preview, and loading/success demo flow

Part 2:

- [`src/pages/HackerNewsPage.tsx`](/Users/konstantinafreri/Documents/goodtape-task/src/pages/HackerNewsPage.tsx): Hacker News page shell
- [`src/components/StoryList.tsx`](/Users/konstantinafreri/Documents/goodtape-task/src/components/StoryList.tsx): feed switching, loading states, load-more behavior
- [`src/components/StoryCard.tsx`](/Users/konstantinafreri/Documents/goodtape-task/src/components/StoryCard.tsx): individual story UI and skeleton state
- [`src/hooks/useTopStories.ts`](/Users/konstantinafreri/Documents/goodtape-task/src/hooks/useTopStories.ts): fetch orchestration, progress tracking, cancellation, state management
- [`src/services/hn-api.ts`](/Users/konstantinafreri/Documents/goodtape-task/src/services/hn-api.ts): Hacker News API requests and story mapping
- [`src/types/index.ts`](/Users/konstantinafreri/Documents/goodtape-task/src/types/index.ts): shared story types

## Expected behavior

On `/`:

- You can preview the different button states shown in the assignment.
- The playground lets you toggle hover, loading, disabled, and shadow style.
- The main demo button runs through a loading sequence until it reaches 100%, then shows a success message and can be restarted.
- The top-right icon button opens the Hacker News reader. On large screens it stays fixed, and on small screens it sits inline with the rest of the page content.

On `/hacker-news`:

- The app fetches stories from the Hacker News API.
- You can switch between `Top`, `New`, and `Best`.
- The page shows skeletons on initial load, a progress indicator while loading, and an error state if a request fails.
- `Load more` fetches more visible stories in batches.
- Each story card opens the article in a new tab, or falls back to the Hacker News item page if no external URL exists.

## Button component

The reusable button lives in [`src/components/Button.tsx`](/Users/konstantinafreri/Documents/goodtape-task/src/components/Button.tsx).

Supported props:

- `shadow="neutral" | "tint"`
- `loading`
- `progress`
- `disabled`
- `asChild`
- standard button props like `onClick`, `type`, `className`

Example:

```tsx
<Button shadow="tint" onClick={handleClick}>
  Clickable
</Button>

<Button loading progress={80} shadow="tint">
  Loading
</Button>
```

When `loading` is true, the component disables interaction, shows a progress-based background fill, and displays the loading label with the percentage.

## Finding the News feed

- Open `/hacker-news` directly
- Or start on `/` and use the top-right icon button

## Notes on implementation

- The button API is intentionally small so it is easy to reuse in other screens.
- The Hacker News logic is separated from presentation: fetching lives in the hook/service layer, while rendering lives in `StoryList` and `StoryCard`.
- Request cancellation is handled in the hook to avoid stale updates when switching feeds quickly.
