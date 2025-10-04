'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getFosterPets } from '@/server/pets';
import { useQuery } from '@tanstack/react-query';

export default function PetPage() {
    const queryPets = async () => {
        try {
            const response = await getFosterPets();

            if (!response.success) {
                return null;
            }

            return response.data;
        } catch (error) {
            console.error('An error occured: ', error);
        }
    };

    const { data } = useQuery({
        queryKey: ['pets'],
        queryFn: queryPets,
    });
    return (
        <div className="grid grid-rows-[80px_1fr]">
            <h1 className="font-poppins font-semibold text-4xl">
                Pet Listings
            </h1>
            <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {data !== null && data !== undefined ? (
                    data.map((pet) => (
                        <Card key={pet.pet_id}>
                            <CardHeader className="text-center">
                                <CardTitle>{pet.pet_name}</CardTitle>
                                <CardDescription>
                                    {pet.pet_species}
                                </CardDescription>
                            </CardHeader>
                            <hr />
                            <CardContent>
                                <ul>
                                    <li className="grid grid-cols-2">
                                        <div>Age: </div>
                                        <div>{pet.pet_age}</div>
                                    </li>
                                    <li className="grid grid-cols-2">
                                        <div>Pet status: </div>
                                        <div>{pet.pet_status}</div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Skeleton className="h-full w-full" />
                )}
            </section>
        </div>
    );
}
