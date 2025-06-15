import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function UpdatePassword({ user }) {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>
            <form>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            // value={data.name}
                            // onChange={(e) => setData('name', e.target.value)}
                            // disabled={processing}
                        />
                        {/* <InputError message={errors.name} className="mt-2" /> */}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Re-type Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            // value={data.name}
                            // onChange={(e) => setData('name', e.target.value)}
                            // disabled={processing}
                        />
                        {/* <InputError message={errors.name} className="mt-2" /> */}
                    </div>
                </div>
            </form>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    );
}
