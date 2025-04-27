'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import LoginPage from './(full-page)/auth/login/page';
import axiosInstance from './_services/AxiosInstance';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        // const isAuthPage = pathname.startsWith('/auth');

        if (token) {
            const authChecked = async () => {
                const resp = await axiosInstance.get('auth');
                if (resp.status === 200) {
                    const data = await resp.data;
                    setAuthChecked(true);
                    console.log(data);
                } else {
                    console.error('Authentication failed with status:', resp.status);
                    setAuthChecked(false);
                    router.push('/auth/login');
                }
            };
            authChecked();
        }
        // Redirect based on token
        if (!token) {
            router.push('/auth/login');
            setAuthChecked(false);
        }

        // ✅ Let component render after decision
    }, [pathname, router]);

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet" />
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>{!authChecked ? <LoginPage></LoginPage> : children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
