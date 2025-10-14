'use client';
import { Form, FormGroup, FormLabel } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { insertPet } from '@/server/pets';
import { Dialog } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function AddPet() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return insertPet(formData);
        },
        onSuccess: () => {
            toast('Created successfully');
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
            setWeight('');
        }

        // Test if current field value match the regex if not then do not set
        if (numericRegex.test(value)) {
            setWeight(value);
        }
    };

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Test if user input is number and only allow two decimal places
        const numericRegex = /^\d*\.?\d{0,2}$/;

        // if field length is less than or equal to zero set amount to empty
        if (value.length <= 1) {
            setHeight('');
        }

        // Test if current field value match the regex if not then do not set
        if (numericRegex.test(value)) {
            setHeight(value);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold rounded-xl px-14 shadow-md transition-all"
                onClick={() => setOpen(true)}
            >
                New pet
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-center">
                    <DialogTitle className="font-poppins font-medium text-2xl">New Pet</DialogTitle>
                    <DialogDescription>Post new foster pet</DialogDescription>
                </DialogHeader>

                <Form className="grid gap-2" action={handleSubmit}>
                    <FormGroup className="grid grid-cols-2 gap-3">
                        <FormGroup className="grid gap-2">
                            <FormLabel>Pet name</FormLabel>
                            <Input id="name" name="name" type="text" placeholder="Pet name" required />
                        </FormGroup>
                        <FormGroup className="grid gap-2">
                            <FormLabel>Species</FormLabel>
                            <Input id="species" name="species" type="text" placeholder="Species" required />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="grid grid-cols-2 gap-3">
                        <FormGroup className="grid gap-2">
                            <FormLabel>Age</FormLabel>
                            <Input id="age" name="age" type="text" placeholder="Age" required />
                        </FormGroup>
                        <FormGroup className="grid gap-2 w-full">
                            <FormLabel>Sex</FormLabel>
                            <Select name="sex" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sex" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="grid grid-cols-2 gap-2">
                        <FormGroup className="grid gap-2">
                            <FormLabel>Breed</FormLabel>
                            <Input id="breed" name="breed" type="text" placeholder="Pet breed" required />
                        </FormGroup>
                        <FormGroup className="grid gap-2">
                            <FormLabel>Birthday</FormLabel>
                            <Input id="birthday" name="birthday" type="date" placeholder="Pet birthday (Optional)" />
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
                                value={weight}
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
                                value={height}
                                onChange={handleHeightChange}
                                required
                            />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="grid gap-2">
                        <FormGroup className="grid gap-2 w-full">
                            <FormLabel>Description</FormLabel>
                            <Textarea id="description" name="description" placeholder="Description" />
                        </FormGroup>
                        <FormGroup className="grid gap-2 w-full">
                            <FormLabel>Conditions</FormLabel>
                            <Textarea id="condition" name="condition" placeholder="Conditions (Optional)" />
                        </FormGroup>
                    </FormGroup>
                    <Button variant={'default'} className="mt-4" onClick={() => setOpen(false)}>
                        Save
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
