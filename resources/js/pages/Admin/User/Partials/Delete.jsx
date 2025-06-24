import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Delete({ record, getData }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/admin/user/delete/${record.id}`);

            if (res.data.status === 'deleted') {
                getData();
                toast.success('User Deleted', {
                    description: 'The user has been removed successfully.',
                });
            }
        } catch (err) {
            toast.error('Delete Failed', {
                description: 'An error occurred while trying to delete the user.',
            });
            console.log(err);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete and remove the data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction disabled={processing} onClick={handleDelete}>
                    {processing ? (
                        <>
                            <Loader2Icon className="animate-spin" />
                            Please wait
                        </>
                    ) : (
                        <>Yes, Delete it</>
                    )}
                </AlertDialogAction>
                <AlertDialogCancel>No, Keep it</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
