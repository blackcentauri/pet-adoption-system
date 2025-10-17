'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { getAllFosterRequests } from '@/server/admin';
import { BadgeColor } from '@/components/Badges';
import Image from 'next/image';
import VerificationModal from '@/components/VerificationModal';
import { format } from 'date-fns';

export default function AdminPage() {
    // const queryClient = useQueryClient();

    // const mutation = useMutation({
    //     mutationFn: async ({
    //         applicationId,
    //         applicationStatus,
    //     }: {
    //         applicationId: number;
    //         applicationStatus: string;
    //     }) => {
    //         return updateApplication(applicationId, applicationStatus);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['applications'] });
    //     },
    // });
    // const handleChange = (applicationId: number) => async (newStatus: string) => {
    //     try {
    //         await mutation.mutateAsync({ applicationId, applicationStatus: newStatus });
    //     } catch (error) {
    //         console.error('An error occured: ', error);
    //         return false;
    //     }
    // };

    const { data } = useQuery({
        queryKey: ['applications'],
        queryFn: () => getAllFosterRequests().then((response) => response.data),
    });

    return (
        <div className="grid grid-rows-[90px_1fr]">
            <h1 className="font-poppins font-semibold text-3xl">Foster pets</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Pet name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Foster Request</TableHead>
                        <TableHead>Application Date</TableHead>
                        <TableHead>Verification</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data !== undefined
                        ? data.map((application) => (
                              <TableRow key={application.application_id}>
                                  <TableCell>
                                      <Image
                                          src={application.pets.pet_image}
                                          alt={application.pets.pet_image}
                                          width={50}
                                          height={50}
                                          className="rounded-3xl"
                                      />
                                  </TableCell>
                                  <TableCell>{application.pets.pet_name}</TableCell>
                                  <TableCell>
                                      <BadgeColor status={application.application_status ?? 'applied'} />
                                  </TableCell>
                                  <TableCell>{application.users.username}</TableCell>
                                  <TableCell>
                                      {application.application_date
                                          ? format(
                                                new Date(application.application_date).toLocaleDateString(),
                                                'MMMM dd, yyyy'
                                            )
                                          : 'N/A'}
                                  </TableCell>
                                  <TableCell>
                                      <VerificationModal {...application} />
                                  </TableCell>
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </div>
    );
}

{
    /* <Select
    onValueChange={handleChange(application.application_id)}
    defaultValue={application.application_status !== null ? application.application_status : 'applied'}
>
    <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
    </SelectTrigger>
    <SelectContent>
        {applicationTypes.map((item) => (
            <SelectItem key={item} value={item}>
                {item}
            </SelectItem>
        ))}
    </SelectContent>
</Select>; */
}
