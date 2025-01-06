export interface SideQuest {
  id: number;
  name: string;
  map: string;
  level?: number | null;
  location?: string | null;
  startX?: string | null;
  startY?: string | null;
  startZ?: string | null;
  giver?: string | null;
  wikiLink?: string | null;
  prerequisites?: string | null;
  gameId?: number | null;
  completed?: boolean | null;
  category?: string | null;
  steps?: string | null;
}
