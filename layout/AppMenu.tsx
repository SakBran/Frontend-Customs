/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Users',
            items: [
                { label: 'Users', icon: 'pi pi-fw pi-users', to: '/user/list' },
                { label: 'Add new user', icon: 'pi pi-user-plus', to: '/user/addNewUser' }
            ]
        },
        {
            label: 'IRD-CEIR ID List',
            items: [{ label: 'CEIR ID List', icon: 'pi pi-server', to: '/CEIRD' }]
        },
        {
            label: 'Operations',
            items: [
                { label: 'Sent List', icon: 'pi pi-file-export', to: '/sentList' },
                { label: 'Failed List', icon: 'pi pi-ban', to: '/failedList' },
                { label: 'Not Sent List', icon: 'pi pi-wrench', to: '/notSentList' },
                { label: 'Duplicate List', icon: 'pi pi-clone', to: '/duplicateList' },
                { label: 'Delete List', icon: 'pi pi-trash', to: '/deleteList' }
            ]
        },
        {
            label: 'Logs',
            items: [{ label: 'User Logs', icon: 'pi pi-book', to: '/userLogs' }]
        },
        {
            label: 'Report',
            items: [
                { label: 'Report 1', icon: 'pi pi-chart-bar', to: '/1' },
                { label: 'Report 2', icon: 'pi pi-chart-bar', to: '/2' },
                { label: 'Report 3', icon: 'pi pi-chart-bar', to: '/3' }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
