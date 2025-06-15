import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


import React, { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Edit, Ellipsis, KeyRound, Trash } from 'lucide-react';
import CreateUpdate from './CreateUpdate';
import UpdatePassword from './UpdatePassword';
export default function Action({ getData, user }) {
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const shouldRenderDialog = !menuOpen && (deleteAlert  || editModal || changePassword);

    return (
        <>
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="left" align="start">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setEditModal(true)}>
                        <Edit />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setChangePassword(true)}>
                        <KeyRound />
                        Change Password
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteAlert(true)}>
                        <Trash />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {shouldRenderDialog && (
                <>
                    <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete and remove the data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction>Continue</AlertDialogAction>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* form */}

                    <Dialog open={editModal} onOpenChange={setEditModal}>
                        <CreateUpdate getData={getData} setEditModal={setEditModal} user={user} />
                    </Dialog>

                    <Dialog open={changePassword} onOpenChange={setChangePassword}>
                        <UpdatePassword user={user} />
                    </Dialog>
                </>
            )}
        </>
    );
}
