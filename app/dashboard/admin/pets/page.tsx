'use client';
import { pets } from '@/app/generated/prisma';
import AddPet from '@/components/AddPet';
import AdminViewPets from '@/components/AdminViewPets';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFosterPets } from '@/server/pets';
import { useQuery } from '@tanstack/react-query';
import { ListFilter, PawPrint } from 'lucide-react';
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

    const handleSpeciesSort = (value: string) => {
        if (!value || value === 'all') {
            setPets(allPets);
            return;
        }

        const filtered = allPets.filter((p) => p.pet_species?.toLowerCase() === value.toLowerCase());
        setPets(filtered);
    };
    useQuery({
        queryKey: ['pets'],
        queryFn: queryPets,
    });
    return (
        <div className="grid grid-rows-[80px_1fr] gap-4">
            <nav className="flex justify-between items-center">
                <h1 className="font-poppins font-semibold text-4xl">Pet Listings</h1>
                <div className="grid grid-cols-4 justify-between gap-3">
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
                    <div className="flex gap-2 items-center">
                        <PawPrint />
                        <Select name="sort" onValueChange={handleSpeciesSort}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="dog">Dog</SelectItem>
                                <SelectItem value="cat">Cat</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Input type="text" placeholder="Search" value={search} onChange={handleSearch} />

                    <AddPet />
                </div>
            </nav>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center max-w-6xl w-full mb-20">
                <PetContext.Provider value={{ pets, setPets, open, setOpen }}>
                    {pets.map((pet) => (
                        <div
                            key={pet.pet_id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="relative w-full h-56">
                                <Image src={pet.pet_image} alt={pet.pet_name} fill className="object-cover" />
                            </div>
                            <div className="p-5 text-center">
                                <CardHeader className="text-center">
                                    <CardTitle className="font-bold text-[#F7B500] text-lg mb-1 font-poppins">
                                        {pet.pet_name}
                                    </CardTitle>
                                    <CardDescription className="uppercase text-sm text-gray-500 font-poppins">
                                        {pet.pet_species}
                                    </CardDescription>
                                </CardHeader>

                                <CardFooter>
                                    <AdminViewPets {...pet} />
                                </CardFooter>
                            </div>
                        </div>
                    ))}
                </PetContext.Provider>
            </section>
        </div>
    );
}
