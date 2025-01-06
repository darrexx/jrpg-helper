import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { gamesFormSchema } from '$lib/forms/games/gamesFormSchema';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(gamesFormSchema));

  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(gamesFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    await db.insert(gameTable).values({
      name: form.data.name,
      wikiLink: form.data.wikiLink,
      releaseDate: form.data.releaseDate,
    });
    redirect(303, '/games');
  },
};
