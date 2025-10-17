'use client';
import { pets } from '@/app/generated/prisma';
import AddPet from '@/components/AddPet';
import AdminViewPets from '@/components/AdminViewPets';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFosterPets } from '@/server/pets';
import { useQuery } from '@tanstack/react-query';
import { ListFilter } from 'lucide-react';
import Image from 'next/image';
import { useState, createContext } from 'react';

type PetContextProps = {
    pets: pets[];
    setPets: React.Dispatch<React.SetStateAction<pets[]>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PetContext = createContext<PetContextProps | null>(null);

export default function PetPage() {
    const [allPets, setAllPets] = useState<pets[]>([]);
    const [pets, setPets] = useState<pets[]>([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
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
            [pet.pet_name].some((field) => field?.toLowerCase().includes(value.toLowerCase()))
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
            <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 place-content-center">
                <PetContext.Provider value={{ pets, setPets, open, setOpen }}>
                    {pets.map((pet) => (
                        <Card key={pet.pet_id} className="cursor-pointer">
                            <Image
                                src={pet.pet_image}
                                alt={pet.pet_name}
                                width={250}
                                height={250}
                                className="rounded-2xl -mt-6 w-full"
                            />
                            <CardHeader className="text-center">
                                <CardTitle>{pet.pet_name}</CardTitle>
                                <CardDescription>{pet.pet_species}</CardDescription>
                            </CardHeader>

                            <CardFooter>
                                <AdminViewPets {...pet} />
                            </CardFooter>
                        </Card>
                    ))}
                </PetContext.Provider>
            </section>
        </div>
    );
}
