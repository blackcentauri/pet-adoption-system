import { ApplicationsProps } from '@/model/admin';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import Image from 'next/image';
import { ImageToggle } from './ImageToggle';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateApplication } from '@/server/admin';
import { toast } from 'sonner';

export default function VerificationModal(data: ApplicationsProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({
            applicationId,
            applicationStatus,
        }: {
            applicationId: number;
            applicationStatus: string;
        }) => {
            return updateApplication(applicationId, applicationStatus);
        },
        onSuccess: () => {
            toast('Status updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['applications'] });
        },
    });
    const handleClick = async (applicationId: number, newStatus: string) => {
        try {
            await mutation.mutateAsync({ applicationId, applicationStatus: newStatus });
        } catch (error) {
            console.error('An error occured: ', error);
            return false;
        }
    };
    const birthdayDisplay = data.pets.pet_birthday ? new Date(data.pets.pet_birthday).toLocaleDateString() : 'N/A';
    const applicationDate = data.application_date
        ? format(new Date(data.application_date).toLocaleDateString(), 'MMMM dd, yyyy')
        : 'N/A';
    const userBirthday = data.users.birthday ? new Date(data.users.birthday).toLocaleDateString() : 'N/A';
    return (
        <Dialog>
            <DialogTrigger className="bg-primary px-6 py-2 rounded-2xl text-white hover:bg-amber-400">
                View
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Application</DialogTitle>
                    <DialogDescription>Adoption Request</DialogDescription>
                </DialogHeader>
                <section className="grid gap-2">
                    <h1 className="text-muted-foreground text-center"> FOSTER REQUEST</h1>
                    <div className="grid gap-5">
                        <DialogHeader className="grid gap-3">
                            <div className="grid gap-1 text-center">
                                <DialogTitle className="text-center text-2xl text-[#FED200] hover:text-black font-semibold">
                                    {data.users.first_name + ' ' + data.users.last_name}
                                </DialogTitle>
                                <DialogDescription className="text-center">{data.users.username}</DialogDescription>
                            </div>
                            <section className="grid grid-cols-2 gap-1 justify-start">
                                <DialogDescription className="text-[0.8rem]">
                                    <span className="font-semibold">Application date: </span> {applicationDate}
                                </DialogDescription>
                                <DialogDescription className="text-[0.8rem]">
                                    <span className="font-semibold">Age: </span> {data.users.age ?? 'N/A'}
                                </DialogDescription>
                            </section>
                            <section className="grid grid-cols-2 gap-1 justify-start">
                                <DialogDescription className="text-[0.8rem]">
                                    <span className="font-semibold">Birthday: </span>
                                    {userBirthday}
                                </DialogDescription>
                                <DialogDescription className="text-[0.8rem]">
                                    <span className="font-semibold">Contact No: </span>
                                    {data.users.contact_number ?? 'N/A'}
                                </DialogDescription>
                            </section>
                            <section className="grid grid-cols-2 gap-1 justify-start">
                                <DialogDescription className="text-[0.8rem]">
                                    <span className="font-semibold">Address: </span> {data.users.address ?? 'N/A'}
                                </DialogDescription>
                                <div className="text-[0.8rem]">
                                    <span className="font-semibold">Valid ID: </span>
                                    {data.users.valid_id === null ? (
                                        'N/A'
                                    ) : (
                                        <ImageToggle fileName={data.users.username} imageURL={data.users.valid_id} />
                                    )}
                                </div>
                            </section>
                        </DialogHeader>
                    </div>
                </section>
                <hr />

                <h1 className="text-muted-foreground text-center">REQUESTED PET</h1>
                <Collapsible>
                    <CollapsibleTrigger className="flex items-center gap-2 justify-center text-center">
                        <ChevronDown /> Show pet
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <section className="bg-muted p-2 rounded-2xl">
                            <div className="grid grid-cols-2">
                                <Image
                                    src={data.pets.pet_image}
                                    alt={data.pets.pet_name}
                                    width={160}
                                    height={160}
                                    className="rounded-2xl"
                                />
                                <DialogHeader className="grid gap-3">
                                    <div className="grid gap-1 text-center">
                                        <DialogTitle className="text-center text-2xl text-[#FED200] hover:text-black font-semibold">
                                            {data.pets.pet_name}
                                        </DialogTitle>
                                        <DialogDescription className="text-center">
                                            {data.pets.pet_species}
                                        </DialogDescription>
                                    </div>
                                    <section className="grid grid-cols-2 gap-1 justify-start">
                                        <DialogDescription className="text-[0.8rem]">
                                            <span className="font-semibold">Age: </span> {data.pets.pet_age}
                                        </DialogDescription>
                                        <DialogDescription className="text-[0.8rem]">
                                            <span className="font-semibold">Breed: </span> {data.pets.pet_breed}
                                        </DialogDescription>
                                    </section>
                                    <section className="grid grid-cols-2 gap-1 justify-start">
                                        <DialogDescription className="text-[0.8rem]">
                                            <span className="font-semibold">Weight: </span>
                                            {data.pets.pet_weight}
                                        </DialogDescription>
                                        <DialogDescription className="text-[0.8rem]">
                                            <span className="font-semibold">Height: </span>
                                            {data.pets.pet_height}
                                        </DialogDescription>
                                    </section>
                                    <DialogDescription className="text-[0.8rem]">
                                        <span className="font-semibold">Status: </span>{' '}
                                        {data.pets.pet_status === 'not_adopted' ? 'Not Adopted' : 'Adopted'}
                                    </DialogDescription>
                                    <DialogDescription className="text-[0.8rem]">
                                        <span className="font-semibold">Birthday: </span>
                                        {birthdayDisplay}
                                    </DialogDescription>
                                </DialogHeader>
                            </div>
                            <div className="grid gap-2">
                                <DialogDescription className="grid gap-2">
                                    <span className="font-semibold block">Description: </span>
                                    {data.pets.pet_description}
                                </DialogDescription>
                                <DialogDescription className="grid gap-2">
                                    <span className="font-semibold block">Conditions: </span>
                                    {data.pets.pet_condition}
                                </DialogDescription>
                            </div>
                        </section>
                    </CollapsibleContent>
                </Collapsible>

                <div className="flex items-center justify-between">
                    <Button variant={'destructive'} onClick={() => handleClick(data.application_id, 'rejected')}>
                        Rejected
                    </Button>
                    <Button variant={'default'} onClick={() => handleClick(data.application_id, 'approved')}>
                        Approved
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
