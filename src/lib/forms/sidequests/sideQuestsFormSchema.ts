import z from 'zod';

export const sideQuestsFormSchema = z.object({
  id: z.number().optional().readonly(),
  file: z.any().refine((file: File) => file != null && file.size !== 0, 'File is required'),
});
