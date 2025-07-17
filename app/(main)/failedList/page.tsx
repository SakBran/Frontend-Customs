'use client';
import { BasicTable } from '@/app/_components/Tables/BasicTable';
import useQueryString from '@/app/_hooks/useQueryString';
import { PaginationType } from '@/app/_models/PaginationType';
import { Get, Post } from '@/app/_services/BasicHttpServices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

type Props = {
    id: string;
};

const ResendAction = ({ id }: Props) => {
    const router = useRouter();
    const SendModal = (id: string) => {
        Swal.fire({
            title: 'Do you want to send the changes?',
            showCancelButton: true,
            confirmButtonText: 'Send'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const sendAction = async () => {
                    const response = await Post('Operation', { id: id });
                    if (response) {
                        Swal.fire('Send!', 'Data is successfully transfered', 'success');
                        router.refresh();
                    } else {
                        Swal.fire('Error!', 'Something went wrong', 'error');
                    }
                };
                sendAction();
            }
        });
    };
    return (
        <td>
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    SendModal(id);
                }}
                href={''}
                style={{ cursor: 'pointer' }}
            >
                Re Send
            </Link>
        </td>
    );
};

const Page = () => {
    const { queryString, generateQueryString } = useQueryString();

    const formatDateTime = (value: string) => {
    if (!value || !value.includes('T')) return 'N/A'; 
    const [date, time] = value.split('T');
    const formattedTime = time?.split('.')[0]; 
    return `${date} ${formattedTime}`;
};
    const transformUserData = (data: PaginationType): PaginationType => {
        return {
            ...data,
            data: data.data.map((item) => ({
                ...item,
                isSent: item.isSent == 'True' ? 'Yes' : item.isSent == 'False' ? 'isSent' : 'No',

                sentDatetime: formatDateTime(item.sentDatetime),
                roDate: formatDateTime(item.roDate),
                receivedDatetime: formatDateTime(item.receivedDatetime)
            }))
        };
    };
    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <div className="row">
                    <div className="col-12">
                        <form className="grid formgrid" onSubmit={generateQueryString}>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="roDateFrom" className="mb-2">
                                    RO Date From
                                </label>
                                <input type="date" id="roDateFrom" name="roDateFrom" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="roDateTo" className="mb-2">
                                    RO Date To
                                </label>
                                <input type="date" id="roDateTo" name="roDateTo" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="sentDateFrom" className="mb-2">
                                    Sent Date From
                                </label>
                                <input type="date" id="sentDateFrom" name="sentDateFrom" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="sentDateTo" className="mb-2">
                                    Sent Date To
                                </label>
                                <input type="date" id="sentDateTo" name="sentDateTo" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="ceirId" className="mb-2">
                                    CEIR ID
                                </label>
                                <input type="text" id="ceirId" name="ceirId" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="ceirId" className="mb-2">
                                    RO No
                                </label>
                                <input type="text" id="ceirId" name="ceirId" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12">
                                <div className="flex justify-content-end gap-2">
                                    <button type="submit" className="p-button p-component p-button-primary">
                                        Filter
                                    </button>
                                    <button type="button" className="p-button p-component p-button-secondary">
                                        Export to Excel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <BasicTable
                            api={'Operation/FailedList'}
                            displayData={['ceirid', 'receivedDatetime', 'maccsCEIRID', 'roNo', 'roDate', 'cd', 'ct', 'at', 'rf', 'sendBy', 'sentDatetime', 'id']}
                            fetch={async (url) => {
                                const response = await Get(url + '&' + queryString);
                                return transformUserData(response);
                            }}
                            actionComponent={ResendAction}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
