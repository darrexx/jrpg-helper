import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { gameTable, sideQuestTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const ssr = false;

export const load: PageServerLoad = async ({ params }) => {
  const id = parseInt(params.id);
  if (Number.isNaN(id)) {
    error(404, {
      message: 'no valid id',
    });
  }

  const gameName = await db
    .select({ name: gameTable.name })
    .from(gameTable)
    .where(eq(gameTable.id, id));

  const sideQuests = await db.select().from(sideQuestTable).where(eq(sideQuestTable.gameId, id));

  return { gameName: gameName[0].name, sideQuests: sideQuests, gameId: id };
};
