'use client';
import { BasicTable } from '@/app/_components/Tables/BasicTable';
import { useExcelExport } from '@/app/_hooks/useExcelExport ';
import useQueryString from '@/app/_hooks/useQueryString';
import { PaginationType } from '@/app/_models/PaginationType';
import { Get } from '@/app/_services/BasicHttpServices';
import Link from 'next/link';
import React from 'react';

type Props = {
    id: string;
};

const ResendAction = ({ id }: Props) => {
    return (
        <></>
        // <td>
        //     <Link href={'edit/' + id} style={{ cursor: 'pointer' }}>
        //         Resend
        //     </Link>
        // </td>
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
                roDate: formatDateTime(item.roDate),
                receivedDatetime: formatDateTime(item.receivedDatetime)
            }))
        };
    };

    const { exportTableToExcel } = useExcelExport();

    const handleExportToExcel = async () => {
        await exportTableToExcel({
            tableId: 'basicTable',
            fileName: 'Duplicate List Report',
            sheetName: 'Duplicate List Report'
        });
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
                                    <button type="button" className="p-button p-component p-button-secondary" onClick={handleExportToExcel}>
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
                            api={'Operation/DuplicateList'}
                            displayData={['ceirid', 'receivedDatetime', 'maccsCEIRID', 'oldCeirid', 'roNo', 'roDate', 'cd', 'ct', 'at', 'rf']}
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
