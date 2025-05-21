'use client';
import { NotSentProps, NotSentTable } from '@/app/_components/Tables/NotSentTable';
import useQueryString from '@/app/_hooks/useQueryString';
import { PaginationType } from '@/app/_models/PaginationType';
import { Get, Post, Put } from '@/app/_services/BasicHttpServices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const ResendAction = ({ id, ceirId, editCeirid }: NotSentProps) => {
    const router = useRouter();
    const EditModal = (id: string) => {
        Swal.fire({
            title: 'Please enter CEIR ID and Remark to resend',
            html: `<input id="ceir-id" class="swal2-input" placeholder="CEIR ID">` + `<input id="remark" class="swal2-input" placeholder="Remark">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const ceirId = (document.getElementById('ceir-id') as HTMLInputElement).value;
                const remark = (document.getElementById('remark') as HTMLInputElement).value;

                if (!ceirId || !remark) {
                    Swal.showValidationMessage('Both CEIR ID and Remark are required');
                    return;
                }

                try {
                    const apiUrl = `Operation`;
                    const response = await Put(apiUrl, id, { ceirId, remark });
                    return response;
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Success',
                    text: 'Data is successfully updated',
                    icon: 'success'
                }).then(() => {
                    router.refresh();
                });
            }
        });
    };
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
                    EditModal(id);
                }}
                href={''}
                style={{ cursor: 'pointer' }}
            >
                Edit
            </Link>

            {ceirId === editCeirid && ceirId !== '' && editCeirid !== '' && (
                <>
                    |
                    <Link
                        onClick={(e) => {
                            e.preventDefault();
                            SendModal(id);
                        }}
                        href={''}
                        style={{ cursor: 'pointer' }}
                    >
                        Send
                    </Link>
                </>
            )}
        </td>
    );
};

const Page = () => {
    const { queryString, generateQueryString } = useQueryString();
    const transformUserData = (data: PaginationType): PaginationType => {
        return {
            ...data,
            data: data.data.map((item) => ({
                ...item,
                isSent: item.isSent == 'True' ? 'Yes' : item.isSent == 'False' ? 'isSent' : 'No'
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
                                <label htmlFor="ceirId" className="mb-2">
                                    CEIR ID
                                </label>
                                <input type="text" id="ceirId" name="ceirId" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="roNo" className="mb-2">
                                    RO No
                                </label>
                                <input type="text" id="roNo" name="roNo" className="p-inputtext p-component" />
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
                        <NotSentTable
                            api={'Operation/NotSentList'}
                            displayData={['ceirid', 'receivedDatetime', 'maccsCEIRID', 'editCeirid', 'roNo', 'roDate', 'cd', 'ct', 'at', 'rf', 'sendBy', 'sentDatetime', 'remark', 'editBy', 'editDatetime', 'id']}
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
