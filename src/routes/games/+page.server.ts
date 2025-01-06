import { db } from '$lib/server/db';
import { gameTable } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const games = await db.select().from(gameTable).orderBy(gameTable.id);
  return {
    games: games,
  };
};
