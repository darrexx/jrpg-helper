import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { gameTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
  const id = parseInt(params.id);
  if (Number.isNaN(id)) {
    error(404, {
      message: 'no valid id',
    });
  }

  const gameResult = await db
    .select({ gameName: gameTable.name })
    .from(gameTable)
    .where(eq(gameTable.id, id));

  return { id, gameName: gameResult[0].gameName };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const id = parseInt(form.get('id') as string);

    await db.delete(gameTable).where(eq(gameTable.id, id));

    redirect(303, '/games');
  },
};
