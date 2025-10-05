import * as z from 'zod';

export const CreatePetSchema = z.object({
    name: z.string().min(1, 'Pet name is required'),
    species: z.string().min(1, 'Species type is required'),
    age: z.string().min(1, 'Age is required'),
    sex: z.string().min(1, 'Pet sex is required'),
    breed: z.string().min(1, 'Breed is required'),
    description: z.string(),
});

export type CreatePetValidation = z.infer<typeof CreatePetSchema>;
