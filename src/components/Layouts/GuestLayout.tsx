import Head from 'next/head'
import { PropsWithChildren } from 'react'

interface GuestLayoutProps {}
const GuestLayout = ({ children }: PropsWithChildren<GuestLayoutProps>) => {
    return (
        <div>
            <Head>
                <title>Laravel</title>
            </Head>
            <div className="font-sans text-gray-900 antialiased">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
