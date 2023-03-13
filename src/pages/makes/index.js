import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useDeleteMake, useGetMakes } from '@/hooks/make'
import ButtonLink from '@/components/ButtonLink'
import Spinner from '@/components/Spinner'
import { formatInTimeZoneUtil } from '@/utility/date-util'
import Link from 'next/link'
import Button from '@/components/Button'
import MyModal from '@/components/MyModal'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Make = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMakeId, setSelectedMakeId] = useState(null)
    const { makes, error, isLoading, mutate } = useGetMakes()
    const { trigger } = useDeleteMake({
        options: {
            rollbackOnError: true,
            onSuccess: (data, key, config) => {
                toast('Selected Make has been deleted', {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'success',
                })
            },
            onError: (err, key, config) => {
                if (typeof err == 'string') {
                    toast(err, {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'error',
                    })
                }
            },
            revalidate: false,
            optimisticData: data => {
                const ret = data.filter(d => d.id != selectedMakeId)
                setSelectedMakeId(null)
                return ret
            },
        },
    })

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Make List
                </h2>
            }>
            <Head>
                <title>Laravel - Make List</title>
            </Head>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm  sm:rounded-lg">
                        <div className="border-b border-gray-200  bg-white p-6">
                            {isLoading && <p>Loading...</p>}
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
                                <MyModal
                                    isOpen={isModalOpen}
                                    title={
                                        <h3 className="text-center">
                                            Delete Make
                                        </h3>
                                    }
                                    message={
                                        <p className="text-center">
                                            Are your sure?
                                        </p>
                                    }
                                    // onClose={() => alert(123)}
                                    buttons={
                                        <div className="flex justify-between">
                                            <Button
                                                onClick={() =>
                                                    setIsModalOpen(false)
                                                }>
                                                No
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setIsModalOpen(false)
                                                    trigger({ selectedMakeId })
                                                }}>
                                                Yes
                                            </Button>
                                        </div>
                                    }
                                />
                                <table className="w-full border-collapse border border-slate-400 bg-white text-sm shadow-sm dark:border-slate-500 dark:bg-slate-800">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            <th className="w-1/2 border border-slate-300 p-4 text-center font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                ID
                                            </th>
                                            <th className="w-1/2 border border-slate-300 p-4 text-center font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                Name
                                            </th>
                                            <th className="w-1/2 border border-slate-300 p-4 text-center font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                Created At
                                            </th>
                                            <th className="w-1/2 border border-slate-300 p-4 text-center font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                Updated At
                                            </th>
                                            <th
                                                colSpan={2}
                                                className="w-1/2 border border-slate-300 p-4 text-center font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                                                Action
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
                                                    <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                        <ButtonLink
                                                            href={`/makes/${make.id}`}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className=" inline-block h-6 w-6">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                            </svg>{' '}
                                                            <span className="ml-1">
                                                                VIEW
                                                            </span>
                                                        </ButtonLink>
                                                    </td>
                                                    <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                        <Button
                                                            onClick={() => {
                                                                setIsModalOpen(
                                                                    true,
                                                                )
                                                                setSelectedMakeId(
                                                                    make.id,
                                                                )
                                                            }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="h-6 w-6">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                />
                                                            </svg>

                                                            <span className="ml-1">
                                                                DELETE
                                                            </span>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {makes?.length < 1 && (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="border border-slate-300 p-4 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                    No Data
                                                </td>
                                            </tr>
                                        )}
                                        {isLoading && (
                                            <tr>
                                                <td
                                                    colSpan={5}
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
                                                    colSpan={5}
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
