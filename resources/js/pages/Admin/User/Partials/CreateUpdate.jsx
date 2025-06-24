import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { toast } from 'sonner';

export default function CreateUpdate({ getData, setEditCreateModal, editCreateModal, record }) {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        status: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (record) {
            setFormData({
                name: record.name || '',
                email: record.email || '',
                role: String(record.role) || '',
                status: String(record.status) || '',
                password: '',
                password_confirmation: '',
            });
        }
    }, [record]);

    useEffect(() => {
        if (!editCreateModal) {
            resetForm();
        }
    }, [editCreateModal]);

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            role: '',
            status: '',
            password: '',
            password_confirmation: '',
        });
        setErrors({});
    };

    const handleCloseModal = () => {
        setEditCreateModal(false);
        resetForm();
        getData();
    };

    const handleSubmit = async () => {
        setProcessing(true);
        if (record) {
            //update
            try {
                const res = await axios.put(`/admin/user/update/${record.id}`, formData);

                if (res.data.status === 'updated') {
                    handleCloseModal();
                    toast.success('Edited', {
                        description: 'User details updated successfully.',
                    });
                }
            } catch (err) {
                if (err.response?.status === 422) {
                    setErrors(err.response.data.errors);
                    toast.warning('Validation Error', {
                        description: 'Oops! Some fields need your attention.',
                    });
                }
                console.log(err);
            } finally {
                setProcessing(false);
            }
        } else {
            //create
            try {
                const res = await axios.post('/admin/user/store/', formData);

                if (res.data.status === 'created') {
                    handleCloseModal();
                    toast.success('Edited', {
                        description: 'User details stored successfully',
                    });
                }
            } catch (err) {
                if (err.response?.status === 422) {
                    setErrors(err.response.data.errors);
                    toast.warning('Validation Error', {
                        description: 'Oops! Some fields need your attention.',
                    });
                }
                console.log(err);
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>USER INFORMATION</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <form>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">NAME</Label>
                        <Input
                            name="name"
                            type="text"
                            autoComplete="username"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="Full name"
                            disabled={processing}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="flex gap-2">
                        <div className="grid w-full gap-2">
                            <Label htmlFor="role">ROLE</Label>
                            <Select
                                name="role"
                                value={String(formData.role)}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        role: String(value),
                                    })
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Admin</SelectItem>
                                    <SelectItem value="1">User</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role} className="mt-2" />
                        </div>
                        <div className="grid w-full gap-2">
                            <Label htmlFor="status">STATUS</Label>
                            <Select
                                name="status"
                                value={String(formData.status)}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        status: String(value),
                                    })
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Inactive</SelectItem>
                                    <SelectItem value="1">Active</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">EMAIL</Label>
                        <Input
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            placeholder="example@gmail.com"
                            disabled={processing}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    {!record && (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="password">PASSWORD</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    disabled={processing}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">RE-TYPE PASSWORD</Label>
                                <Input
                                    name="password_confirmation"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.password_confirmation}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password_confirmation: e.target.value,
                                        })
                                    }
                                    disabled={processing}
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </>
                    )}
                </div>
            </form>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button disabled={processing} onClick={handleSubmit}>
                    {processing ? (
                        <>
                            <Loader2Icon className="animate-spin" />
                            Please wait
                        </>
                    ) : (
                        <>{record ? 'Save changes' : 'Create'}</>
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}
