import { pets } from '@/app/generated/prisma';
import { Button } from './ui/button';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

import { DialogTrigger } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { createUserApplication, getUserValidID } from '@/server/user';
import { useRouter } from 'next/navigation';

export default function UserViewPets(petss: pets) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();
    const { data } = useQuery({
        queryKey: ['user-valid-id'],
        queryFn: () => getUserValidID().then((response) => response.success),
    });

    const birthdayDisplay = petss.pet_birthday ? new Date(petss.pet_birthday).toLocaleDateString() : 'N/A';
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold my-4 px-15 py-2 rounded-full shadow-md transition-all">
                View
            </DialogTrigger>
            <DialogContent>
                <div className="grid grid-cols-2">
                    <Image
                        src={petss.pet_image}
                        alt={petss.pet_name}
                        width={160}
                        height={160}
                        className="rounded-2xl"
                    />
                    <DialogHeader className="grid gap-3">
                        <div>
                            <DialogTitle className="text-center text-2xl text-[#FED200] hover:text-black font-semibold">
                                {petss.pet_name}
                            </DialogTitle>
                            <DialogDescription className="text-center">{petss.pet_species}</DialogDescription>
                        </div>
                        <section className="grid grid-cols-2 gap-1 justify-start">
                            <DialogDescription className="text-[0.8rem]">
                                <span className="font-semibold">Age: </span> {petss.pet_age}
                            </DialogDescription>
                            <DialogDescription className="text-[0.8rem]">
                                <span className="font-semibold">Breed: </span> {petss.pet_breed}
                            </DialogDescription>
                        </section>
                        <section className="grid grid-cols-2 gap-1 justify-start">
                            <DialogDescription className="text-[0.8rem]">
                                <span className="font-semibold">Weight: </span>
                                {petss.pet_weight}
                            </DialogDescription>
                            <DialogDescription className="text-[0.8rem]">
                                <span className="font-semibold">Height: </span>
                                {petss.pet_height}
                            </DialogDescription>
                        </section>
                        <DialogDescription className="text-[0.8rem]">
                            <span className="font-semibold">Status: </span>{' '}
                            {petss.pet_status === 'not_adopted' ? 'Not Adopted' : 'Adopted'}
                        </DialogDescription>
                        <DialogDescription className="text-[0.8rem]">
                            <span className="font-semibold">Birthday: </span>
                            {birthdayDisplay}
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <DialogDescription className="grid gap-2">
                    <span className="font-semibold block">Description: </span>
                    {petss.pet_description}
                </DialogDescription>
                <DialogDescription className="grid gap-2">
                    <span className="font-semibold block">Conditions: </span>
                    {petss.pet_condition}
                </DialogDescription>
                <DialogFooter className="grid grid-cols-2 gap-15">
                    <Button
                        className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold my-4 px-15 py-2 rounded-full shadow-md transition-all"
                        variant={'outline'}
                        onClick={() => {
                            if (data === true) {
                                startTransition(() => {
                                    (async () => {
                                        const application = await createUserApplication(petss);
                                        if (application.success) {
                                            toast('Thank you for applying! We will update you soon.');
                                            setOpen(false);
                                        } else {
                                            toast.warning('Failed to submit application.');
                                        }
                                    })();
                                });
                            } else {
                                toast.info('Please upload a valid ID first', {
                                    description:
                                        'Go to profile -> then upload your valid ID and the organization will check your application.',
                                    action: {
                                        label: 'Upload validID',
                                        onClick: () => router.push('/dashboard/user/profile'),
                                    },
                                });
                            }
                        }}
                    >
                        Adopt
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
