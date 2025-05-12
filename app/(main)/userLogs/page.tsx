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

const transformUserData = (data: PaginationType): PaginationType => {
    return {
        ...data,
        data: data.data.map((item) => ({
            ...item,
            isActive: item.isActive == '0' ? 'Active' : item.isActive == '1' ? 'InActive' : 'N/A'
        }))
    };
};

const page = () => {
    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <BasicTable
                    api={'UserLog'}
                    displayData={['description', 'logDatetime', 'fullName', 'oldData', 'newData']}
                    fetch={async (url) => {
                        const response = await Get(url);
                        return transformUserData(response);
                    }}
                />
            </div>
        </div>
    );
};

export default page;
