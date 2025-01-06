import { db } from '$lib/server/db';
import { gameTable, sideQuestTable, uniqueMonsterTable } from '$lib/server/db/schema';
import { count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const id = parseInt(params.id);
  if (Number.isNaN(id)) {
    error(404, {
      message: 'no valid id',
    });
  }

  const gameName = await db
    .select({ gameName: gameTable.name })
    .from(gameTable)
    .where(eq(gameTable.id, id));

  const uniqueMonsterResult = await db
    .select({ count: count() })
    .from(uniqueMonsterTable)
    .where(eq(uniqueMonsterTable.gameId, id));

  const sideQuestResult = await db
    .select({ count: count() })
    .from(sideQuestTable)
    .where(eq(sideQuestTable.gameId, id));

  return {
    amountOfUniqueMonsters: uniqueMonsterResult[0].count,
    amountOfSideQuests: sideQuestResult[0].count,
    gameName: gameName[0].gameName,
    gameId: id,
  };
};
