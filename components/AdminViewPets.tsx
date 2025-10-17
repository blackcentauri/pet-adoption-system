import { pets } from '@/app/generated/prisma';
import UpdatePet from './UpdatePet';
import { deletePet } from '@/server/pets';
import { Button } from './ui/button';
import { useContext, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { PetContext } from '@/app/dashboard/admin/pets/page';
import { DialogTrigger } from '@radix-ui/react-dialog';
import Image from 'next/image';

export default function AdminViewPets(data: pets) {
    const ctx = useContext(PetContext);

    if (!ctx || ctx === null) {
        throw new Error('Pet context is not provided ');
    }
    const { pets, setPets } = ctx;
    const [open, setOpen] = useState(false);

    const [pending, startTransition] = useTransition();

    const birthdayDisplay = data.pet_birthday ? new Date(data.pet_birthday).toLocaleDateString() : 'N/A';
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full rounded-2xl text-accent-foreground border border-accent-foreground hover:bg-muted p-2">
                View
            </DialogTrigger>
            <DialogContent>
                <div className="grid grid-cols-2">
                    <Image src={data.pet_image} alt={data.pet_name} width={160} height={160} className="rounded-2xl" />
                    <DialogHeader className="grid gap-3">
                        <div>
                            <DialogTitle className="text-center text-2xl text-[#FED200] hover:text-black font-semibold">
                                {data.pet_name}
                            </DialogTitle>
                            <DialogDescription className="text-center">{data.pet_species}</DialogDescription>
                        </div>
                        <section className="grid grid-cols-2 gap-1 justify-start">
                            <DialogDescription className="text-[0.8rem]">
                                <span className="font-semibold">Age: </span> {data.pet_age}
                            </DialogDescription>
                            <DialogDescription className="text-[0.8rem]">
                                <span className="font-semibold">Breed: </span> {data.pet_breed}
                            </DialogDescription>
                        </section>
                        <section className="grid grid-cols-2 gap-1 justify-start">
                            <DialogDescription className="text-[0.8rem]">
                                <span className="font-semibold">Weight: </span>
                                {data.pet_weight}
                            </DialogDescription>
                            <DialogDescription className="text-[0.8rem]">
                                <span className="font-semibold">Height: </span>
                                {data.pet_height}
                            </DialogDescription>
                        </section>
                        <DialogDescription className="text-[0.8rem]">
                            <span className="font-semibold">Status: </span>{' '}
                            {data.pet_status === 'not_adopted' ? 'Not Adopted' : 'Adopted'}
                        </DialogDescription>
                        <DialogDescription className="text-[0.8rem]">
                            <span className="font-semibold">Birthday: </span>
                            {birthdayDisplay}
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <DialogDescription className="grid gap-2">
                    <span className="font-semibold block">Description: </span>
                    {data.pet_description}
                </DialogDescription>
                <DialogDescription className="grid gap-2">
                    <span className="font-semibold block">Conditions: </span>
                    {data.pet_condition}
                </DialogDescription>
                <DialogFooter className="grid grid-cols-2 gap-15">
                    <UpdatePet {...data} />
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            startTransition(async () => {
                                const removePet = await deletePet(data.pet_id);

                                if (removePet.success) {
                                    toast('Pet deleted successfully!');
                                }

                                setPets(pets.filter((removePet) => removePet.pet_id !== data.pet_id));
                                setOpen(false);
                            });
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
