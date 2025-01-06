import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { gameTable, uniqueMonsterTable } from '$lib/server/db/schema';
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

  const uniqueMonster = await db
    .select()
    .from(uniqueMonsterTable)
    .where(eq(uniqueMonsterTable.gameId, id));

  return { gameName: gameName[0].name, uniqueMonster: uniqueMonster, gameId: id };
};
