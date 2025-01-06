import z from 'zod';

export const gamesFormSchema = z.object({
  id: z.number().optional().readonly(),
  name: z.string({
    required_error: 'Name is required',
  }),
  releaseDate: z
    .date()
    .optional()
    .transform((x) => (x ? new Date(x.toDateString()) : undefined)),
  wikiLink: z.string().url(),
});
