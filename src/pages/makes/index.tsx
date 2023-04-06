import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useDeleteMake, useGetMakes } from '@/hooks/make'
import ButtonLink from '@/components/ButtonLink'
import Spinner from '@/components/Spinner'
import { formatInTimeZoneUtil } from '@/utility/date-util'
import Link from 'next/link'
import Button from '@/components/Button'
import MyModal from '@/components/MyModal'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useSWR, { SWRConfig } from 'swr'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Label from '@/components/Label'
import { Make, PageLink, ResponseWrapper } from '@/interfaces/interfaces'
import { Axios, AxiosError } from 'axios'
import { ParsedUrlQuery } from 'querystring'

export interface MakePageQuery extends ParsedUrlQuery {
    page?: string
}

const Make = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMakeId, setSelectedMakeId] = useState<number>()
    const router = useRouter()
    const { page } = router.query as MakePageQuery
    const {
        data: makes,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR(
        page ? `api/makes?page=${page}` : `api/makes?page=1`,
        async url => {
            // await delay(2000)
            // console.log(url)
            try {
                const res = await axios.get<ResponseWrapper<Make[]>>(url)
                console.log(res)
                return res.data
            } catch (err) {
                throw err
            }
        },
        {},
    )

    // useEffect(() => {
    //     console.log(makes)
    // }, [makes])

    const { trigger } = useDeleteMake({
        options: {
            rollbackOnError: true,
            onSuccess: (data, key, config) => {
                console.log({
                    data,
                    key,
                    config,
                })
                mutate()
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
            // revalidate: false,
            // optimisticData: data => {
            //     const ret = data.filter(d => d.id != selectedMakeId)
            //     setSelectedMakeId(null)
            //     return ret
            // },
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
            <MyModal
                isOpen={isModalOpen}
                title={<h3 className="text-center">Delete Make</h3>}
                message={<p className="text-center">Are your sure?</p>}
                buttons={
                    <div className="flex justify-between">
                        <Button onClick={() => setIsModalOpen(false)}>
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false)
                                if (selectedMakeId !== undefined) {
                                    trigger({ selectedMakeId })
                                }
                            }}>
                            Yes
                        </Button>
                    </div>
                }
            />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm  sm:rounded-lg">
                        <div className=" border-b  border-gray-200 bg-white p-6">
                            {/* {isLoading && <p>Loading...</p>} */}
                            {/* {isValidating && <p>isValidating...</p>} */}

                            {/* {JSON.stringify(makes)} */}
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
                            <div className="sm: min-w-sm relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center">
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center">
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center">
                                                Created At
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center">
                                                Updated At
                                            </th>
                                            <th
                                                colSpan={2}
                                                scope="col"
                                                className="px-6 py-3 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {makes?.data.map(make => {
                                            return (
                                                <tr
                                                    key={make.id}
                                                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                                    <td
                                                        scope="row"
                                                        className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                                                        {make.id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4  text-center font-medium text-gray-900 dark:text-white">
                                                        {make.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4  text-center font-medium text-gray-900 dark:text-white">
                                                        <time
                                                            dateTime={formatInTimeZoneUtil(
                                                                make.updated_at,
                                                            )}>
                                                            {formatInTimeZoneUtil(
                                                                make.updated_at,
                                                            )}
                                                        </time>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4  text-center font-medium text-gray-900 dark:text-white">
                                                        <time
                                                            dateTime={formatInTimeZoneUtil(
                                                                make.updated_at,
                                                            )}>
                                                            {formatInTimeZoneUtil(
                                                                make.updated_at,
                                                            )}
                                                        </time>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4  text-center font-medium text-gray-900 dark:text-white">
                                                        <Link
                                                            href={`/makes/${make.id}`}
                                                            className="flex
                                                            items-center
                                                            justify-center
                                                            space-x-1
                                                            font-medium
                                                            text-blue-600
                                                            dark:text-blue-500">
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
                                                            </svg>
                                                            <span>View</span>
                                                        </Link>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4  text-center font-medium text-gray-900 dark:text-white">
                                                        <a
                                                            href="#"
                                                            onClick={e => {
                                                                e.preventDefault()
                                                                setIsModalOpen(
                                                                    true,
                                                                )
                                                                setSelectedMakeId(
                                                                    make.id,
                                                                )
                                                            }}
                                                            className="flex items-center justify-center  space-x-1 font-medium text-blue-600 dark:text-blue-500">
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
                                                                />{' '}
                                                            </svg>
                                                            <span>Delete</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {(makes?.data?.length ?? 0) < 1 && (
                                            <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                                <td
                                                    colSpan={5}
                                                    className="whitespace-nowrap px-6 py-4  text-center font-medium text-gray-900 dark:text-white">
                                                    No Data
                                                </td>
                                            </tr>
                                        )}
                                        {/* {(isLoading || isValidating) && (
                                            <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                                <td
                                                    colSpan={5}
                                                    className="whitespace-nowrap px-6 py-4  text-center font-medium text-gray-900 dark:text-white">
                                                    <Spinner />
                                                </td>
                                            </tr>
                                        )} */}
                                        {error && (
                                            <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                                <td
                                                    colSpan={5}
                                                    className="whitespace-nowrap px-6 py-4  text-center font-medium text-gray-900 dark:text-white">
                                                    Error: {error?.message}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <nav
                                    className="flex items-center justify-between p-2"
                                    aria-label="Table navigation">
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Showing{' '}
                                        <span className="font-semibold text-gray-900">
                                            {makes?.meta?.from
                                                ? `${makes?.meta?.from} - ${makes?.meta?.to}`
                                                : '0'}
                                        </span>{' '}
                                        of{' '}
                                        <span className="font-semibold text-gray-900">
                                            {makes?.meta?.total ?? '0'}
                                        </span>
                                    </span>
                                    {/* <ul className="inline-flex items-center -space-x-px">
                                        <li>
                                            <a
                                                href="#"
                                                className="ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span className="sr-only">
                                                    Previous
                                                </span>
                                                <svg
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                aria-current="page"
                                                className=" border border-gray-300 bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                                                3
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="#"
                                                className="block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                                <svg
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul> */}
                                    <ul className="inline-flex items-center -space-x-px">
                                        {makes?.meta?.links?.map(link => {
                                            return (
                                                <Link
                                                    style={{
                                                        // cursor: link.url
                                                        //     ? 'auto'
                                                        //     : 'not-allowed',
                                                        pointerEvents: link.url
                                                            ? 'auto'
                                                            : 'none',
                                                    }}
                                                    key={link.label}
                                                    aria-selected={
                                                        +(page ?? 1) ===
                                                        +link.label
                                                    }
                                                    href={{
                                                        pathname: 'makes',
                                                        query: {
                                                            page: generatePaginationLinkUrl(
                                                                link,
                                                                page,
                                                            ),
                                                        },
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                    className="block border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 first:rounded-l-lg last:rounded-r-lg hover:bg-gray-100 hover:text-gray-700  aria-selected:bg-gray-100 aria-selected:text-gray-700 dark:border-gray-700   dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white aria-selected:dark:bg-gray-700 dark:aria-selected:text-white"
                                                />
                                            )
                                        })}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

function generatePaginationLinkUrl(
    link: PageLink,
    page?: string,
): number | undefined {
    if (link.url == undefined) {
        return undefined
    }

    if (!isNaN(+link.label)) {
        return +link.label
    }

    if (page) {
        if (link.label == 'Next &raquo;') {
            return +page + 1
        } else {
            return +page + -1
        }
    }
    return undefined
}

export default Make
