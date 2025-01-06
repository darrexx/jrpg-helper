export interface UniqueMonster {
  id: number;
  name: string;
  map: string;
  level?: number | null;
  location?: string | null;
  x?: string | null;
  y?: string | null;
  z?: string | null;
  wikiLink?: string | null;
  spawnTime?: string | null;
  gameId?: number | null;
  completed?: boolean | null;
}
