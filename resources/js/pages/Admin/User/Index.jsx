import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Action from './Partials/Action';
import { ArrowDown, ArrowDownUp, ArrowUp, FilterX, Loader2Icon, Plus, RefreshCcw  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MyPagination from '@/components/MyPagination';

import { Dialog } from '@/components/ui/dialog';
import CreateUpdate from './Partials/CreateUpdate';

const breadcrumbs = [
    {
        title: 'User Management',
        href: '/admin/user/index',
    },
];

export default function Index() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationLinks, setPaginationLinks] = useState([]);

    //filter
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");
    const [verified, setVerified] = useState("");
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('desc');

    const reset = () => {
        setSearch('');
        setStatus('');
        setRole('');
        setVerified('');
        setPage(1);
    }

    const getData = async () => {
        setLoading(true);

        const params = [
            `page=${page}`, 
            `search=${search}`, 
            `status=${status}`, 
            `role=${role}`, 
            `verified=${verified}`,
            `order=${order}`,
        ].join('&');

        try{
            const res = await axios.get(`/admin/user/getdata?${params}`);

            if(res.status === 200){
                setData(res.data.data);
                setPaginationLinks(res.data.links); 
            }
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    //implement debounce
    useEffect(() => {
        if(search.length > 0){
            const timer = setTimeout(() => {
                getData();
            }, 500);

            return () => {
                clearTimeout(timer);
            };
        }else{
            getData();
        }
    }, [search]);

    useEffect(() => {
        getData();
    }, [page, status, role, verified, order]);

    //create

    const [editCreateModal, setEditCreateModal] = useState(false);
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="m-4 space-y-2 rounded-xl">
                <p className="text-lg font-bold">List of Users</p>
                <div className="flex justify-between gap-2">
                    <div className="flex w-full gap-2">
                        <Button onClick={setEditCreateModal}>
                            <Plus />
                            New
                        </Button>
                        <Input
                            className="w-full min-w-[280px]"
                            type="text"
                            placeholder="Search data"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={getData}>
                            <RefreshCcw />
                        </Button>
                        <Button variant="ghost" onClick={() => setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
                            {order === 'asc' ? <ArrowUp /> : <ArrowDown />}
                        </Button>
                        <Button variant="ghost" onClick={reset}>
                            <FilterX />
                        </Button>
                        <Select value={verified} onValueChange={(value) => setVerified(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Verified" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={role} onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Admin</SelectItem>
                                <SelectItem value="1">User</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={status} onValueChange={(value) => setStatus(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Active</SelectItem>
                                <SelectItem value="0">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="rounded-xl border p-4">
                    <Table>
                        <TableHeader className="font-bold uppercase">
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Verified</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="py-12 text-center">
                                        <div className="flex items-center justify-center">
                                            <RefreshCcw className="animate-spin" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : data && data.length > 0 ? (
                                <>
                                    {data.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell>{record.id}</TableCell>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>
                                                {record.email_verified_at ? (
                                                    <Badge variant="default">Yes</Badge>
                                                ) : (
                                                    <Badge variant="destructive">No</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {record.role === 0 ? (
                                                    <Badge variant="secondary">Admin</Badge>
                                                ) : record.role === 1 ? (
                                                    <Badge variant="secondary">User</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Undefined</Badge>
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                {record.status === 1 ? (
                                                    <Badge variant="default">Active</Badge>
                                                ) : (
                                                    <Badge variant="destructive">Inactive</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Action getData={getData} record={record} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="mt-12 text-center">
                                        No data found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="py-4">
                    <MyPagination
                        links={paginationLinks}
                        onPageChange={(url) => {
                            const page = new URL(url).searchParams.get('page');
                            setPage(page);
                        }}
                    />
                </div>
                {editCreateModal && (
                    <Dialog open={editCreateModal} onOpenChange={setEditCreateModal}>
                        <CreateUpdate getData={getData} setEditCreateModal={setEditCreateModal} editCreateModal={editCreateModal} user={null} />
                    </Dialog>
                )}
            </div>
        </AppLayout>
    );
}
