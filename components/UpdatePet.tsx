'use client';
import { Form, FormGroup, FormLabel } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { updatePet } from '@/server/pets';
import { Dialog } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { pets } from '@/app/generated/prisma';

export default function UpdatePet(data: pets) {
    const [form, setForm] = useState({
        name: data.pet_name,
        species: data.pet_species,
        age: data.pet_age,
        breed: data.pet_breed,
        birthday: data.pet_birthday,
        weight: data.pet_weight as unknown as string,
        height: data.pet_height as unknown as string,
        description: data.pet_description,
        condition: data.pet_condition,
    });
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return updatePet(formData);
        },
        onSuccess: () => {
            toast('Updated successfully');
            queryClient.invalidateQueries({ queryKey: ['pets'] });
        },
        onError: () => {
            toast('Failed to create');
        },
    });

    const handleSubmit = async (data: FormData) => {
        try {
            await mutation.mutateAsync(data);
        } catch (error) {
            console.error('An error occured: ', error);
        }
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Test if user input is number and only allow two decimal places
        const numericRegex = /^\d*\.?\d{0,2}$/;

        // if field length is less than or equal to zero set amount to empty
        if (value.length <= 1) {
            setForm({ ...form, weight: '' });
        }

        // Test if current field value match the regex if not then do not set
        if (numericRegex.test(value)) {
            setForm({ ...form, weight: event.target.value });
        }
    };

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Test if user input is number and only allow two decimal places
        const numericRegex = /^\d*\.?\d{0,2}$/;

        // if field length is less than or equal to zero set amount to empty
        if (value.length <= 1) {
            setForm({ ...form, height: '' });
        }

        // Test if current field value match the regex if not then do not set
        if (numericRegex.test(value)) {
            setForm({ ...form, height: value });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold rounded-xl px-14 py-2 shadow-md transition-all"
                onClick={() => setOpen(true)}
            >
                Update
            </DialogTrigger>
            <DialogContent className="overflow-scroll">
                <DialogHeader className="text-center">
                    <DialogTitle className="font-poppins font-medium text-2xl">Update Pet</DialogTitle>
                    <DialogDescription className="text-3xl font-extrabold text-yellow-500">
                        {data.pet_name}
                    </DialogDescription>
                </DialogHeader>

                <Form className="grid gap-2" action={handleSubmit}>
                    <Input id="id" name="id" type="hidden" value={data.pet_id} aria-hidden />
                    <FormGroup className="grid grid-cols-2 gap-3">
                        <FormGroup className="grid gap-2">
                            <FormLabel>Pet name</FormLabel>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Pet name"
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup className="grid gap-2">
                            <FormLabel>Species</FormLabel>
                            <Input
                                id="species"
                                name="species"
                                type="text"
                                placeholder="Species"
                                value={form.species}
                                onChange={(event) => setForm({ ...form, species: event.target.value })}
                                required
                            />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="grid grid-cols-3 gap-3">
                        <FormGroup className="grid gap-2">
                            <FormLabel>Age</FormLabel>
                            <Input
                                id="age"
                                name="age"
                                type="text"
                                placeholder="Age"
                                value={form.age}
                                onChange={(event) => setForm({ ...form, age: event.target.value })}
                                required
                            />
                        </FormGroup>

                        <FormGroup className="grid gap-2">
                            <FormLabel>Sex</FormLabel>
                            <Select name="sex" required defaultValue={data.pet_sex}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sex" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormGroup>

                        <FormGroup className="grid gap-2">
                            <FormLabel>Status</FormLabel>
                            <Select name="status" required defaultValue={data.pet_status ?? 'not_adopted'}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not_adopted">Not adopted</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="adopted">Adopted</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="grid grid-cols-2 gap-2">
                        <FormGroup className="grid gap-2">
                            <FormLabel>Breed</FormLabel>
                            <Input
                                id="breed"
                                name="breed"
                                type="text"
                                placeholder="Pet breed"
                                value={form.breed}
                                onChange={(event) => setForm({ ...form, breed: event.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup className="grid gap-2">
                            <FormLabel>Birthday</FormLabel>
                            <Input
                                id="birthday"
                                name="birthday"
                                type="date"
                                placeholder="Pet birthday (Optional)"
                                defaultValue={
                                    data.pet_birthday ? new Date(data.pet_birthday).toISOString().split('T')[0] : ''
                                }
                            />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="grid grid-cols-2 gap-2">
                        <FormGroup className="grid gap-2">
                            <FormLabel>Weight</FormLabel>
                            <Input
                                id="weight"
                                name="weight"
                                type="text"
                                placeholder="Weight (kg)"
                                value={form.weight}
                                onChange={handleWeightChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup className="grid gap-2">
                            <FormLabel>Height</FormLabel>
                            <Input
                                id="height"
                                name="height"
                                type="text"
                                placeholder="Height (inches)"
                                value={form.height}
                                onChange={handleHeightChange}
                                required
                            />
                        </FormGroup>
                    </FormGroup>

                    <FormGroup className="grid gap-2">
                        <FormGroup className="grid gap-2 w-full">
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={(event) => setForm({ ...form, description: event.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="grid gap-2 w-full">
                            <FormLabel>Conditions</FormLabel>
                            <Textarea
                                id="condition"
                                name="condition"
                                placeholder="Conditions (Optional)"
                                value={form.condition ? form.condition : ''}
                                onChange={(event) => setForm({ ...form, condition: event.target.value })}
                            />
                        </FormGroup>
                    </FormGroup>
                    <Button type="submit" variant={'default'} className="mt-4" onClick={() => setOpen(false)}>
                        Save
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
