'use client';
import PetDialog from '@/components/Modal';
import { getAllPets } from '@/server/pets';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function AvailablePetsPage() {
    const { data } = useQuery({
        queryKey: ['available-pets'],
        queryFn: () => getAllPets().then((response) => response.data),
    });
    return (
        <div
            className="min-h-screen bg-[#FFFCEB] flex flex-col items-center font-poppins 
"
        >
            <h1 className="text-2xl font-semibold text-[#F7B500] mt-10 mb-10 text-left w-full max-w-6xl font-poppins">
                START YOUR ADOPTION JOURNEY
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center max-w-6xl w-full mb-20">
                {data !== undefined
                    ? data.map((pet) => (
                          <div
                              key={pet.pet_id}
                              className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                          >
                              <div className="relative w-full h-56">
                                  {/* <Image src={pet.pet_image} alt={pet.pet_name} fill className="object-cover" /> */}
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
                                          <strong>Status:</strong> {pet.pet_status}
                                      </p>
                                  </div>
                                  <PetDialog
                                      pet_id={pet.pet_id}
                                      pet_name={pet.pet_name}
                                      pet_age={pet.pet_age}
                                      pet_species={pet.pet_species}
                                      pet_status={pet.pet_status}
                                      pet_description={pet.pet_description}
                                      pet_image={pet.pet_image}
                                      pet_breed={pet.pet_breed}
                                      pet_sex={pet.pet_sex}
                                      admin_id={pet.admin_id}
                                  />
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
