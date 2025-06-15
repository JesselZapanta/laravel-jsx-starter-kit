import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { toast } from 'sonner';

export default function CreateUpdate({ getData, setEditModal, user }) {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        status: user.status || '',
    });

    const [processing, serProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        serProcessing(true);
        if (user) {
            //update
            console.log(formData);
            try {
                const res = await axios.put(`/admin/user/update/${user.id}`, formData);

                if (res.data.status === 'updated') {
                    //do something
                    // alert('updated');
                    // router.visit('/admin/user/index');
                    setEditModal(false);
                    getData();
                    toast.success('Edited', {
                        description: 'User details updated successfully.',
                    });
                }

                console.log(res);
            } catch (err) {
                if (err.status === 422) {
                    setErrors(err.response.data.errors);
                    toast.warning('Validation Error', {
                        description: 'Oops! Some fields need your attention.',
                    });
                }
                console.log(err);
            } finally {
                serProcessing(false);
            }
        } else {
            //create
        }
    };

    console.log(user);

    return (
        <form>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>USER INFORMATION</DialogTitle>
                    {/* <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">NAME</Label>
                        <Input
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
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
                            <InputError message={errors.email} className="mt-2" />
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
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">EMAIL</Label>
                        <Input
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
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
                </div>
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
                            <>Save changes</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </form>
    );
}
