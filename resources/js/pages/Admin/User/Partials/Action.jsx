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
} from '@/components/ui/dialog';

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
import Delete from './Delete';
export default function Action({ getData, record }) {
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [editCreateModal, setEditCreateModal] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const shouldRenderDialog = !menuOpen && (deleteAlert  || editCreateModal || changePassword);

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
                    <DropdownMenuItem onClick={() => setEditCreateModal(true)}>
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
                    {/* Delete */}
                    <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
                        <Delete 
                            record={record} 
                            getData={getData} 
                        />
                    </AlertDialog>

                    {/* Create or Update */}
                    <Dialog open={editCreateModal} onOpenChange={setEditCreateModal}>
                        <CreateUpdate 
                            getData={getData} 
                            setEditCreateModal={setEditCreateModal} 
                            editCreateModal={editCreateModal} 
                            record={record} 
                        />
                    </Dialog>

                    {/* Update Password */}
                    <Dialog open={changePassword} onOpenChange={setChangePassword}>
                        <UpdatePassword 
                            getData={getData} 
                            setChangePassword={setChangePassword} 
                            record={record} 
                        />
                    </Dialog>
                </>
            )}
        </>
    );
}
