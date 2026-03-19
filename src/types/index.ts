export interface HNStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number; // Comment count
}

export type HNStoryType = "top" | "new" | "best";
