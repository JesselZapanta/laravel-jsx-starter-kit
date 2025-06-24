import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useState } from 'react';
export default function UpdatePassword({ getData, setChangePassword, record }) {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: '',
    });

    const handleCloseModal = () => {
        setChangePassword(false);
        getData();
        setErrors({});
    };

    const handleSubmit = async () => {
        setProcessing(true);
        try {
            const res = await axios.put(`/admin/user/password/${record.id}`, formData);

            if (res.data.status === 'updated') {
                handleCloseModal();
                toast.success('Edited', {
                    description: 'User password updated successfully',
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
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>CHANGE PASSWORD</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <form>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="password">NEW PASSWORD</Label>
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
                </div>
            </form>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmit}>Save changes</Button>
            </DialogFooter>
        </DialogContent>
    );
}
