import * as z from 'zod';

export const CreatePetSchema = z.object({
    name: z.string().min(1, 'Pet name is required'),
    species: z.string().min(1, 'Species type is required'),
    age: z.string().min(1, 'Age is required'),
    sex: z.string().min(1, 'Pet sex is required'),
    breed: z.string().min(1, 'Breed is required'),
    birthday: z.date().optional(),
    weight: z.number(),
    height: z.number(),
    description: z.string(),
    condition: z.string(),
});

export const UpdatePetSchema = z.object({
    id: z.number(),
    name: z.string().min(1, 'Pet name is required'),
    species: z.string().min(1, 'Species type is required'),
    age: z.string().min(1, 'Age is required'),
    sex: z.string().min(1, 'Pet sex is required'),
    breed: z.string().min(1, 'Breed is required'),
    birthday: z.date().optional(),
    weight: z.number(),
    height: z.number(),
    status: z.string().min(1, 'Pet status is required'),
    description: z.string(),
    condition: z.string(),
});

export type UpdatePetValidation = z.infer<typeof UpdatePetSchema>;
export type CreatePetValidation = z.infer<typeof CreatePetSchema>;
