'use client';
import { BasicTable } from '@/app/_components/Tables/BasicTable';
import { PaginationType } from '@/app/_models/PaginationType';
import { Get } from '@/app/_services/BasicHttpServices';
import Link from 'next/link';
import React from 'react';

type Props = {
    id: string;
};

const UserTableAction = ({ id }: Props) => {
    return (
        <td>
            <Link href={'/user/' + id} style={{ cursor: 'pointer' }}>
                Edit
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
