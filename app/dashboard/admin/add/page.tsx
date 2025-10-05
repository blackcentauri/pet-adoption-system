'use client';
import { Form, FormError, FormGroup, FormLabel } from '@/components/Form';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { insertPet } from '@/server/pets';
import { ActionResponse } from '@/server/response';
import { Loader2Icon } from 'lucide-react';
import { useActionState } from 'react';
import { toast } from 'sonner';

const initialState: ActionResponse = {
    success: false,
    message: '',
    error: '',
};

export default function AddPet() {
    const handleSubmit = async (
        prevState: ActionResponse,
        formData: FormData
    ) => {
        try {
            const pet = await insertPet(formData);

            if (!pet.success) {
                return {
                    success: false,
                    message: 'Failed to insert pet',
                };
            }

            toast('Created Successfully!');

            return {
                success: true,
                message: 'Created Successfully!',
            };
        } catch (error) {
            console.error('An error occured:', error);
            return {
                success: false,
                message: 'Failed to insert',
                error: 'Insertion error',
            };
        }
    };
    const [state, formAction, isPending] = useActionState<
        ActionResponse,
        FormData
    >(handleSubmit, initialState);
    return (
        <div className="h-full grid place-content-center">
            <Card className="w-[50vw] max-w-[700px]">
                <CardHeader className="text-center">
                    <CardTitle>
                        <h1 className="font-poppins font-medium text-4xl">
                            Add Pet
                        </h1>
                    </CardTitle>
                    <CardDescription>Post new foster pet</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormError className="text-red-500">
                        {state.error ? state.error : null}
                    </FormError>
                    <Form className="grid gap-2" action={formAction}>
                        <FormGroup className="grid grid-cols-2 gap-3">
                            <FormGroup className="grid gap-2">
                                <FormLabel>Pet name</FormLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Pet name"
                                    required
                                    disabled={isPending}
                                />
                            </FormGroup>
                            <FormGroup className="grid gap-2">
                                <FormLabel>Species</FormLabel>
                                <Input
                                    id="species"
                                    name="species"
                                    type="text"
                                    placeholder="Species"
                                    required
                                    disabled={isPending}
                                />
                            </FormGroup>
                        </FormGroup>
                        <FormGroup className="grid grid-cols-2 gap-3">
                            <FormGroup className="grid gap-2">
                                <FormLabel>Age</FormLabel>
                                <Input
                                    id="age"
                                    name="age"
                                    type="text"
                                    placeholder="Age"
                                    required
                                    disabled={isPending}
                                />
                            </FormGroup>
                            <FormGroup className="grid gap-2 w-full">
                                <FormLabel>Sex</FormLabel>
                                <Select
                                    name="sex"
                                    required
                                    disabled={isPending}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sex" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>
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
                                    required
                                    disabled={isPending}
                                />
                            </FormGroup>
                        </FormGroup>
                        <FormGroup className="grid gap-2">
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Description"
                                required
                                disabled={isPending}
                            />
                        </FormGroup>
                        <Button variant={'default'} className="mt-4">
                            {isPending ? (
                                <Loader2Icon className="animate-spin" />
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
