'use client';
import { BasicTable } from '@/app/_components/Tables/BasicTable';
import { PaginationType } from '@/app/_models/PaginationType';
import { Get } from '@/app/_services/BasicHttpServices';
import React from 'react';

const page = () => {
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
                        <form className="grid formgrid">
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="fromDate" className="mb-2">
                                    Received From Date
                                </label>
                                <input type="date" id="fromDate" name="fromDate" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="toDate" className="mb-2">
                                    Received To Date
                                </label>
                                <input type="date" id="toDate" name="toDate" className="p-inputtext p-component" />
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
                                <label htmlFor="isSent" className="mb-2">
                                    Is Sent
                                </label>
                                <select id="isSent" name="isSent" className="p-inputtext p-component">
                                    <option value="Sent">Sent</option>
                                    <option value="Not Sent">Not Sent</option>
                                </select>
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
                            api={'User'}
                            displayData={['CEIRID', 'ReceivedDatetime', 'isSent', 'SendDatetime']}
                            fetch={async (url) => {
                                const response = await Get(url);
                                return transformUserData(response);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
