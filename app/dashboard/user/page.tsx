'use client';
import UserViewPets from '@/components/UserViewPets';
import { Input } from '@/components/ui/input';
import { getAllPets } from '@/server/pets';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { pets } from '@/app/generated/prisma';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ListFilter } from 'lucide-react';

export default function AvailablePetsPage() {
    const [allPets, setAllPets] = useState<pets[]>([]);
    const [pets, setPets] = useState<pets[]>([]);
    const [search, setSearch] = useState('');
    const queryPets = async () => {
        try {
            const response = await getAllPets();

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

    const { data } = useQuery({
        queryKey: ['available-pets'],
        queryFn: queryPets,
    });

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
        if (!value || value === 'all') {
            setPets(allPets);
            return;
        }

        const filtered = allPets.filter((p) => p.pet_species?.toLowerCase() === value.toLowerCase());
        setPets(filtered);
    };
    return (
        <div
            className="min-h-screen bg-[#FFFCEB] flex flex-col items-center font-poppins 
"
        >
            <div className="flex items-center gap-10 mt-5">
                <Input type="search" placeholder="Search by name:" onChange={handleSearch} value={search} />
                <div className="flex items-center gap-2">
                    <ListFilter />
                    <Select name="sort" onValueChange={handleSort}>
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
            </div>
            <h1 className="text-2xl font-semibold text-[#F7B500] mt-10 mb-10 text-left w-full max-w-6xl font-poppins">
                START YOUR ADOPTION JOURNEY
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center max-w-6xl w-full mb-20">
                {pets !== undefined
                    ? pets.map((pet) => (
                          <div
                              key={pet.pet_id}
                              className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                          >
                              <div className="relative w-full h-56">
                                  <Image src={pet.pet_image} alt={pet.pet_name} fill className="object-cover" />
                              </div>

                              <div className="p-5 text-center">
                                  <h2 className="font-bold text-[#F7B500] text-lg mb-1 font-poppins">{pet.pet_name}</h2>
                                  <p className="uppercase text-sm text-gray-500 font-poppins">{pet.pet_species}</p>

                                  <hr className="my-3 border-gray-300" />

                                  <div className="text-left text-sm text-gray-600 space-y-1 font-poppins">
                                      <p>
                                          <strong>Age:</strong> {pet.pet_age}
                                      </p>
                                      <p>
                                          <strong>Breed:</strong> {pet.pet_breed}
                                      </p>
                                      <p>
                                          <strong>Status:</strong>{' '}
                                          {pet.pet_status === 'not_adopted' ? 'Not Adopted' : 'Adopted'}
                                      </p>
                                  </div>
                                  <UserViewPets {...pet} />
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
