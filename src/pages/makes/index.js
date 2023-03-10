import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
// import { format, parse, parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

import { useGetMakes } from '@/hooks/make'
import ButtonLink from '@/components/ButtonLink'
import Spinner from '@/components/Spinner'
import { formatInTimeZoneUtil } from '@/utility/date-util'

const Make = () => {
    const { makes, error, isLoading } = useGetMakes()
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Make - List
                </h2>
            }>
            <Head>
                <title>Laravel - Make List</title>
            </Head>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm  sm:rounded-lg">
                        <div className="border-b border-gray-200  bg-white p-6">
                            {/* {JSON.stringify(makes)} */}
                            {/* <div> */}
                            {/* {isLoading && <p>Loading...</p>} */}
                            <div>
                                <div className=" mb-4 text-right">
                                    <ButtonLink
                                        // className=""
                                        className="text-red-600"
                                        href="makes/create">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-6 w-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                        {'\u00A0'}
                                        CREATE
                                    </ButtonLink>
                                </div>
                                <table className="w-full border-collapse border border-slate-400 bg-white text-sm shadow-sm dark:border-slate-500 dark:bg-slate-800 sm:rounded-lg ">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                ID
                                            </th>
                                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                Name
                                            </th>
                                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                Created At
                                            </th>
                                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                Updated At
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {makes?.map(make => {
                                            return (
                                                <tr key={make.id}>
                                                    <td
                                                        id={`make-${make.id}`}
                                                        className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                        {make.id}
                                                    </td>
                                                    <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                        {make.name}
                                                    </td>
                                                    <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                        <time
                                                            dateTime={formatInTimeZoneUtil(
                                                                make.created_at,
                                                            )}>
                                                            {formatInTimeZoneUtil(
                                                                make.created_at,
                                                            )}
                                                        </time>
                                                    </td>
                                                    <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                        <time
                                                            dateTime={formatInTimeZoneUtil(
                                                                make.updated_at,
                                                            )}>
                                                            {formatInTimeZoneUtil(
                                                                make.updated_at,
                                                            )}
                                                        </time>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {makes?.length < 1 && (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="border border-slate-300 p-4 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                    No Data
                                                </td>
                                            </tr>
                                        )}
                                        {isLoading && (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className=" border border-slate-300 p-4 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                    <div className="flex justify-center">
                                                        <Spinner />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {error && (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className=" border border-slate-300 p-4 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                    <span className="text-sm text-red-600">
                                                        Error: {error?.message}
                                                    </span>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Make
