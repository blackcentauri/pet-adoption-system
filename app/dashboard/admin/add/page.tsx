import { Form, FormGroup, FormLabel } from '@/components/Form';
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

export default function AddPet() {
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
                    <Form className="grid gap-2">
                        <FormGroup className="grid grid-cols-2 gap-3">
                            <FormGroup className="grid gap-2">
                                <FormLabel>Pet name</FormLabel>
                                <Input
                                    id="petName"
                                    name="petName"
                                    type="text"
                                    placeholder="Pet name"
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
                                    required
                                />
                            </FormGroup>
                        </FormGroup>
                        <FormGroup className="grid grid-cols-2 gap-3">
                            <FormGroup className="grid gap-2">
                                <FormLabel>Age</FormLabel>
                                <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    placeholder="Age"
                                    required
                                />
                            </FormGroup>
                            <FormGroup className="grid gap-2">
                                <FormLabel>Sex</FormLabel>
                                <Select name="sex" required>
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
                        <FormGroup className="grid gap-2">
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Description"
                                required
                            />
                        </FormGroup>
                        <Button variant={'default'} className="mt-4">
                            Save
                        </Button>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
