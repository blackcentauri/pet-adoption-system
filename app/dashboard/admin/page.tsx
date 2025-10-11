'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllFosterRequests, updateApplication } from '@/server/admin';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { applicationTypes } from '@/util/types';

export default function AdminPage() {
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
            queryClient.invalidateQueries({ queryKey: ['applications'] });
        },
    });
    const handleChange = (applicationId: number) => async (newStatus: string) => {
        try {
            await mutation.mutateAsync({ applicationId, applicationStatus: newStatus });
        } catch (error) {
            console.error('An error occured: ', error);
            return false;
        }
    };

    const { data } = useQuery({
        queryKey: ['applications'],
        queryFn: () => getAllFosterRequests().then((response) => response.data),
    });

    return (
        <div className="grid grid-rows-[90px_1fr]">
            <h1 className="font-poppins font-semibold text-4xl">Foster pets</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Pet name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Foster Request</TableHead>
                        <TableHead>Application Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data !== undefined
                        ? data.map((application) => (
                              <TableRow key={application.application_id}>
                                  <TableCell>{application.pets.pet_name}</TableCell>
                                  <TableCell>
                                      <Select
                                          onValueChange={handleChange(application.application_id)}
                                          defaultValue={
                                              application.application_status !== null
                                                  ? application.application_status
                                                  : 'applied'
                                          }
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
                                      </Select>
                                  </TableCell>
                                  <TableCell>{application.users.username}</TableCell>
                                  <TableCell>{application.application_date?.toLocaleDateString()}</TableCell>
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
        </div>
    );
}
