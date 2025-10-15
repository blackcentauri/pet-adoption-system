'use client';
// import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { pets } from '@/app/generated/prisma';
import { Button } from './ui/button';
import { useState, useTransition } from 'react';
import { createUserApplication } from '@/server/user';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';

export default function PetDialog(data: pets) {
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();
    return (
        <Dialog open={open} onOpenChange={() => setOpen(true)}>
            <DialogTrigger className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold my-4 px-15 py-2 rounded-full shadow-md transition-all">
                Adopt
            </DialogTrigger>
            <DialogContent className="grid grid-cols-2 gap-3">
                <DialogHeader>
                    {/* <Image
                        src={data.pet_image}
                        alt="Pet"
                        width={350}
                        height={350}
                        className="w-[350px] h-[350px] rounded-xl object-cover shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                    /> */}
                </DialogHeader>
                <div className="w-full grid gap-3 text-gray-700">
                    <h1 className="text-3xl font-extrabold text-yellow-500">{data.pet_name}</h1>
                    <DialogTitle className="text-xl font-semibold text-gray-500">{data.pet_species}</DialogTitle>
                    <hr className="border-t-2 border-gray-200" />

                    <section className="grid gap-2">
                        <DialogDescription className="font-semibold text-gray-600">
                            Age: <span className="font-normal text-gray-700">{data.pet_age} YEAR OLD</span>
                        </DialogDescription>
                        <DialogDescription className="font-semibold text-gray-600">
                            Gender: <span className="ml-2 font-normal text-gray-700">{data.pet_sex}</span>
                        </DialogDescription>

                        <h3 className="font-semibold text-gray-600 mt-6">{data.pet_name}’s Description:</h3>

                        <DialogDescription className="text-sm leading-relaxed text-gray-700">
                            {data.pet_description}
                        </DialogDescription>
                    </section>

                    <DialogFooter>
                        <Button
                            onClick={() => {
                                startTransition(async () => {
                                    const application = await createUserApplication(data);

                                    if (application.success) {
                                        toast('Thank you for applying! We will update you soon.');
                                        setOpen(false);
                                    }
                                });
                            }}
                            className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold rounded-full shadow-md transition-all w-full"
                        >
                            {pending ? <Loader2Icon className="animate-spin" /> : <>Adopt</>}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
