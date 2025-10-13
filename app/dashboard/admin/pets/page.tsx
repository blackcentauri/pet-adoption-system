'use client';
import { pets } from '@/app/generated/prisma';
import AddPet from '@/components/AddPet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { deletePet, getFosterPets } from '@/server/pets';
import { useQuery } from '@tanstack/react-query';
import { ListFilter } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function PetPage() {
    const [pending, startTransition] = useTransition();
    const [allPets, setAllPets] = useState<pets[]>([]);
    const [pets, setPets] = useState<pets[]>([]);
    const [search, setSearch] = useState('');
    const queryPets = async () => {
        try {
            const response = await getFosterPets();

            if (!response.success) {
                return [];
            }
            setAllPets(response.data ? response.data : []);
            setPets(response.data ? response.data : []);
            return response.data;
        } catch (error) {
            console.error('An error occured: ', error);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);

        if (!value.trim()) {
            setPets(allPets);
            return;
        }

        const filteredPets = allPets.filter((pet) =>
            [pet.pet_name, pet.pet_species, pet.pet_breed, pet.pet_status].some((field) =>
                field?.toLowerCase().includes(value.toLowerCase())
            )
        );

        setPets(filteredPets);
    };

    const handleSort = (value: string) => {
        const sortedPets = [...allPets].sort((a, b) =>
            a.pet_name.localeCompare(b.pet_name, undefined, { sensitivity: 'base' })
        );
        setPets(value === 'asc' ? sortedPets : sortedPets.reverse());
    };
    useQuery({
        queryKey: ['pets'],
        queryFn: queryPets,
    });
    return (
        <div className="grid grid-rows-[80px_1fr] gap-4">
            <nav className="flex justify-between items-center">
                <h1 className="font-poppins font-semibold text-4xl">Pet Listings</h1>
                <div className="grid grid-cols-3 justify-between gap-3">
                    <div className="flex gap-2 items-center">
                        <ListFilter />
                        <Select name="sort" onValueChange={handleSort}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">ASC</SelectItem>
                                <SelectItem value="desc">DESC</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Input type="text" placeholder="Search" value={search} onChange={handleSearch} />

                    <AddPet />
                </div>
            </nav>
            <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {pets.map((pet) => (
                    <Card key={pet.pet_id}>
                        <CardHeader className="text-center">
                            <CardTitle>{pet.pet_name}</CardTitle>
                            <CardDescription>{pet.pet_species}</CardDescription>
                        </CardHeader>
                        <hr />
                        <CardContent className="grid gap-2">
                            <ul>
                                <li className="grid grid-cols-2">
                                    <div className="text-[0.8rem] font-semibold">Age: </div>
                                    <div className="text-[0.8rem]">{pet.pet_age}</div>
                                </li>
                                <li className="grid grid-cols-2">
                                    <div className="text-[0.8rem] font-semibold">Pet status: </div>
                                    <div className="text-[0.8rem]">
                                        {pet.pet_status === 'not_adopted' ? 'Not Adopted' : 'Adopted'}
                                    </div>
                                </li>
                                <li className="grid grid-cols-2">
                                    <div className="text-[0.8rem] font-semibold">Breed: </div>
                                    <div className="text-[0.8rem]">{pet.pet_breed}</div>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter className="grid grid-rows-2 gap-3">
                            <Button variant={'default'} className="font-semibold">
                                Update
                            </Button>
                            <Button
                                variant={'outline'}
                                onClick={() => {
                                    startTransition(async () => {
                                        const removePet = await deletePet(pet.pet_id);

                                        if (removePet.success) {
                                            toast('Pet deleted successfully!');
                                        }

                                        setPets(pets.filter((removePet) => removePet.pet_id !== pet.pet_id));
                                    });
                                }}
                            >
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </div>
    );
}
