import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { uniqueMonsterFormSchema } from '$lib/forms/uniqueMonster/uniqueMonsterFormSchema';
// import * as schema from '$lib/forms/uniqueMonster/uniqueMonster.schema.json';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms';
import { db } from '$lib/server/db';
import { uniqueMonsterTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { UniqueMonster } from '$lib/models/uniqueMonster';
// import Ajv from 'ajv';
// import { Validator } from 'jsonschema';

export const load: PageServerLoad = async ({ params }) => {
  const form = await superValidate({ id: parseInt(params.id) }, zod(uniqueMonsterFormSchema));

  return { form };
};

//todo skip validation for now as it somehow returns an error even if other online resources validate without error
// const ajv = new Ajv({ strict: false });
// const validate = ajv.compile({
//   type: 'array',
//   items: {
//     type: 'object',
//     properties: {
//       name: {
//         type: 'string',
//       },
//       level: {
//         type: 'integer',
//       },
//       map: {
//         type: 'string',
//       },
//       location: {
//         type: 'string',
//       },
//       x: {
//         type: 'number',
//       },
//       y: {
//         type: 'number',
//       },
//       z: {
//         type: 'number',
//       },
//       wikiLink: {
//         type: 'string',
//       },
//       spawnTime: {
//         type: 'string',
//       },
//     },
//     required: ['name', 'map'],
//   },
// });

// const validator = new Validator();

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(uniqueMonsterFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    if (form.data.id == null || form.data.file == null) {
      return fail(400, { form });
    }

    const file = form.data.file as File;
    const jsonFileText = await file.text();

    console.log(jsonFileText);
    //todo skip validation for now as it somehow returns an error even if other online resources validate without error
    // const valid = validator.validate(jsonFileText, {
    //       type: 'array',
    //       items: {
    //         type: 'object',
    //         properties: {
    //           name: {
    //             type: 'string',
    //           },
    //           map: {
    //             type: 'string',
    //           },
    //           level: {
    //             type: 'number',
    //           },
    //           location: {
    //             type: 'string',
    //           },
    //           x: {
    //             type: 'number',
    //           },
    //           y: {
    //             type: 'number',
    //           },
    //           z: {
    //             type: 'number',
    //           },
    //           wikiLink: {
    //             type: 'string',
    //           },
    //           spawnTime: {
    //             type: 'string',
    //           },
    //         },
    //         required: ['name', 'map'],
    //       },
    // });
    // if (valid.valid) {
    //   console.log('vaoid');
    // } else {
    //   console.log(valid.toString());
    //   console.log('invalid');
    // }

    // const valid = validate(jsonFileText);

    // if (!valid) {
    //   console.log(validate.errors);
    //   return setError(
    //     form,
    //     'file',
    //     validate.errors?.join('::') ?? '' /*'file does not match schema'*/,
    //   );
    // }

    const id = form.data.id;

    //todo Message queue for computation to allow of partial json files
    await db.delete(uniqueMonsterTable).where(eq(uniqueMonsterTable.gameId, id));
    const uniqueMonsters: UniqueMonster[] = JSON.parse(jsonFileText);
    uniqueMonsters.forEach((element) => {
      element.gameId = id;
    });

    await db.insert(uniqueMonsterTable).values(uniqueMonsters);
    // return { form };
    redirect(303, '/games/');
  },
};
