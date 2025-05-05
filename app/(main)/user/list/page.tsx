'use client';
import { BasicTable } from '@/app/_components/Tables/BasicTable';
import { PaginationType } from '@/app/_models/PaginationType';
import { Delete, Get } from '@/app/_services/BasicHttpServices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

type Props = {
    id: string;
};

const UserTableAction = ({ id }: Props) => {
    const router = useRouter();

    const DeleteUser = async (id: string) => {
        // const response = await Delete('User', id);
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const deleteAction = async () => {
                    const response = await Delete('User', id);
                    Swal.fire('Deleted!', 'Data is successfully deleted', 'success');
                    router.refresh();
                };
                deleteAction();
            }
        });
    };
    return (
        <td>
            <Link href={`/user/${id}`} style={{ cursor: 'pointer' }}>
                Edit
            </Link>
            |
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    DeleteUser(id);
                }}
                href={''}
            >
                Delete
            </Link>
        </td>
    );
};

const page = () => {
    const transformUserData = (data: PaginationType): PaginationType => {
        return {
            ...data,
            data: data.data.map((item) => ({
                ...item,
                isActive: item.isActive == '0' ? 'Active' : item.isActive == '1' ? 'InActive' : 'N/A'
            }))
        };
    };
    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <BasicTable
                    api={'User'}
                    displayData={['name', 'password', 'permission', 'isActive', 'id']}
                    fetch={async (url) => {
                        const response = await Get(url);
                        return transformUserData(response);
                    }}
                    actionComponent={UserTableAction}
                />
            </div>
        </div>
    );
};

export default page;
