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

export default function AddPet() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return insertPet(formData);
        },
        onSuccess: () => {
            toast('Created successfully');
            queryClient.invalidateQueries({ queryKey: ['pets'] });
        },
    });

    const handleSubmit = async (data: FormData) => {
        try {
            await mutation.mutateAsync(data);
        } catch (error) {
            console.error('An error occured: ', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold rounded-xl px-14 shadow-md transition-all">
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
                    </FormGroup>
                    <FormGroup className="grid gap-2">
                        <FormLabel>Description</FormLabel>
                        <Textarea id="description" name="description" placeholder="Description" required />
                    </FormGroup>
                    <Button variant={'default'} className="mt-4">
                        Save
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
