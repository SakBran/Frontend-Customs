'use client';
import React, { useEffect, useState } from 'react';
import './style.css';
import { PaginationType } from '../../_models/PaginationType';
import NameConvert from '../../_services/NameConvert';

//ဒီနေရမှာ Ant Designက Table သုံးလဲရတယ် Depedencyနဲနိုင်သမျှနဲအောင် လုပ်သာအကောင်းဆုံးပဲ
//Fetch လုပ်တာလဲ ပြချင်တဲ့ Column ကို Display Dataထဲထည့်ပေးရုံပဲ
//Fetch ကထွက်လာတဲ့ Databindingကလဲ အဆင်ပြေအောင် Componentအပြင်ပဲထုတ်ထားတယ်

export type TableFunctionType = (api: string) => Promise<PaginationType>;
interface PropsType {
    displayData: string[];
    api: string;
    fetch: (url: string) => Promise<PaginationType>;
    actionComponent?: React.FC<{ id: string }>; // add this props for userTableAction
}

export const BasicTable: React.FC<PropsType> = ({
    displayData,
    api,
    fetch,
    actionComponent // add this props for userTableAction
}) => {
    const intialValue: PaginationType = {
        data: [],
        pageIndex: 0,
        pageSize: 0,
        totalCount: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        sortColumn: '',
        sortOrder: '',
        filterColumn: '',
        filterQuery: ''
    };
    const [loading, setloading] = useState<boolean>(false);
    const [sortColumn, setSortColumn] = useState(displayData[1]);
    const [sortDirection, setSortDirection] = useState('desc');

    const [filterColumn, setFilterColumn] = useState(displayData[0]);
    const [filterQuery, setFilterQuery] = useState('');

    const [searchValue, setSearchValue] = useState('');

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [data, setData] = useState<PaginationType>(intialValue);

    const [url, setUrl] = useState('');
    const handleSort = (column: string) => {
        setSortColumn(column);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    //ဒီထဲကParameterက Dotnet Core ထဲကPagination Getနဲ့ညှိပေးထားတာ
    //တကယ်လို့ပြင်ချင်ရင် Parameter တွေပြင်သုံးပေါ့
    useEffect(() => {
        let temp = `${api}?pageIndex=${pageIndex}&pageSize=${pageSize}`;

        if (sortColumn !== '') {
            temp = temp + `&sortColumn=${sortColumn}&sortOrder=${sortDirection}`;
        }
        if (filterQuery !== '' && filterColumn !== '') {
            temp = temp + `&filterColumn=${filterColumn}&filterQuery=${filterQuery}`;
        }
        setUrl(temp);
    }, [sortColumn, sortDirection, pageSize, pageIndex, filterColumn, filterQuery, api, fetch, url]);

    useEffect(() => {
        setloading(true);
        const call = async () => {
            try {
                setData(await fetch(url));
                setloading(false);
            } catch (ex) {
                setloading(false);
            }
        };
        call();
    }, [fetch, url]);

    return (
        <>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <td>No</td>
                            {displayData.map((display: string, i) => {
                                if (display !== 'id') {
                                    return (
                                        <td key={i} onClick={() => handleSort(display)}>
                                            {NameConvert(display)}
                                            {sortColumn === display && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                                        </td>
                                    );
                                } else {
                                    return '';
                                }
                            })}
                            <td>Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {data.data?.map((row, index) => {
                            const data = displayData.map((display: string, i) => {
                                if (display !== 'id') {
                                    const cellValue = row[display];
                                    return <td key={i}>{cellValue?.toString() ?? 'N/A'}</td>;
                                } else {
                                    return '';
                                }
                            });

                            return (
                                <tr key={row['id']}>
                                    <td>{index + 1 + pageIndex * pageSize}</td>
                                    {data}
                                    {/* <TableAction id={row['id']} /> */}
                                    {actionComponent ? actionComponent({ id: row['id'] }) : null}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <div
                    className="compact-pagination"
                    style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'center', // Center horizontally
                        padding: '10px 0',
                        fontSize: '14px'
                    }}
                >
                    <button
                        style={{
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: pageIndex === 0 ? '#e0e0e0' : '#007bff',
                            color: '#fff',
                            cursor: pageIndex === 0 ? 'not-allowed' : 'pointer',
                            opacity: pageIndex === 0 ? 0.6 : 1
                        }}
                        disabled={pageIndex === 0}
                        onClick={() => setPageIndex(pageIndex - 1)}
                    >
                        &lt;
                    </button>
                    <span>
                        {pageIndex + 1} / {data.totalPages}
                    </span>
                    <button
                        style={{
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: !data.hasNextPage ? '#e0e0e0' : '#007bff',
                            color: '#fff',
                            cursor: !data.hasNextPage ? 'not-allowed' : 'pointer',
                            opacity: !data.hasNextPage ? 0.6 : 1
                        }}
                        disabled={!data.hasNextPage}
                        onClick={() => setPageIndex(pageIndex + 1)}
                    >
                        &gt;
                    </button>
                    <select
                        style={{
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            cursor: 'pointer'
                        }}
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 20, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};
