import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

export const ImageToggle = ({ fileName, imageURL }: { fileName: string; imageURL: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-primary py-1 px-3 rounded-xl text-white">View ID</DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-center">User Valid ID</DialogTitle>
                <Image src={imageURL} alt={fileName} width={450} height={250} />
            </DialogContent>
        </Dialog>
    );
};
