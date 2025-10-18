'use client';
import { application_status } from '@/app/generated/prisma';
import { BadgeColor } from '@/components/Badges';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchAllUserApplications } from '@/server/pets';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function UserApplicationsPage() {
    const { data } = useQuery({
        queryKey: ['user-applications'],
        queryFn: () => fetchAllUserApplications().then((response) => response.data),
    });

    return (
        <main className="p-8 grid grid-cols-[]">
            <h1 className="text-2xl font-semibold text-[#F7B500] mt-10 mb-10 text-left w-full max-w-6xl font-poppins">
                YOUR APPLICATIONS
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center max-w-6xl w-full mb-20">
                {data !== undefined
                    ? data.map((pet) => (
                          <div
                              key={pet.pet_id}
                              className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                          >
                              <div className="relative w-full h-56">
                                  <Image
                                      src={pet.pets.pet_image}
                                      alt={pet.pets.pet_name}
                                      fill
                                      className="object-cover"
                                  />
                              </div>

                              <div className="p-5 text-center">
                                  <h2 className="font-bold text-[#F7B500] text-lg mb-1 font-poppins">
                                      {pet.pets.pet_name}
                                  </h2>
                                  <p className="uppercase text-sm text-gray-500 font-poppins">{pet.pets.pet_species}</p>

                                  <hr className="my-3 border-gray-300" />

                                  <div className="text-left text-sm text-gray-600 space-y-1 font-poppins">
                                      <p>
                                          <strong>Age:</strong> {pet.pets.pet_age}
                                      </p>
                                      <p>
                                          <strong>Breed:</strong> {pet.pets.pet_breed}
                                      </p>
                                      <p>
                                          <strong>Status:</strong>{' '}
                                          {pet.pets.pet_status === 'not_adopted' ? 'Not Adopted' : 'Adopted'}
                                      </p>
                                      <p>
                                          <strong>Application status: </strong>{'   '}
                                          <BadgeColor status={pet.application_status as application_status} />
                                      </p>
                                  </div>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </main>
    );
}
