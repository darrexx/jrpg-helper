import { db } from '$lib/server/db';
import { gameTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { gamesFormSchema } from '$lib/forms/games/gamesFormSchema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ params }) => {
  const idParam = params.id;
  const id = parseInt(idParam);
  if (Number.isNaN(id)) {
    error(404, {
      message: 'no valid number',
    });
  }
  const game = await db.select().from(gameTable).where(eq(gameTable.id, id));
  if (game == null || game.length == 0 || game.length > 1) {
    error(404, {
      message: 'game not found',
    });
  }

  //needed to map releaseDate
  const formGame: { id: number; wikiLink: string; releaseDate?: Date; name: string } = {
    id: game[0].id,
    name: game[0].name,
    wikiLink: game[0].wikiLink,
    releaseDate: game[0].releaseDate ?? undefined,
  };
  const form = await superValidate(formGame, zod(gamesFormSchema));
  return { form: form, id: game[0].id };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(gamesFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    if (form.data.id == null) {
      return fail(400, { form });
    }

    await db
      .update(gameTable)
      .set({
        name: form.data.name,
        wikiLink: form.data.wikiLink,
        releaseDate: form.data.releaseDate,
      })
      .where(eq(gameTable.id, form.data.id));

    redirect(303, '/games');
  },
};
