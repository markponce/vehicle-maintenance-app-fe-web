import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useAuth } from '@/hooks/auth'
import { format, parse, parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Button from '@/components/Button'
import AuthCard from '@/components/AuthCard'

const Make = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    const {
        data: makes,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR('/api/makes', url =>
        axios
            .get('/api/makes')
            .then(res => res.data)
            .catch(error => {
                throw error
            }),
    )

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Makes - List
                </h2>
            }>
            <Head>
                <title>Laravel - Makes List</title>
            </Head>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm  sm:rounded-lg">
                        <div className="border-b border-gray-200  bg-white p-6">
                            {/* {JSON.stringify(makes)} */}
                            {/* <div> */}
                            {isLoading && <p>Loading...</p>}
                            {error && <p>error.message</p>}
                            {/* </div> */}
                            {!isLoading && !error && (
                                <div>
                                    {/* <a onClick={() => router.push('/make/new')}>
                                        NEW
                                    </a> */}
                                    <form onSubmit={() => {}}>
                                        {/* Name Address */}
                                        <div>
                                            <Label htmlFor="name">Name</Label>

                                            <Input
                                                id="name"
                                                type="name"
                                                value={name}
                                                className="mt-1 block w-full"
                                                onChange={event =>
                                                    setName(event.target.value)
                                                }
                                                required
                                                autoFocus
                                            />

                                            <InputError
                                                messages={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-4 flex items-center justify-end">
                                            <Button className="ml-3">
                                                ADD
                                            </Button>
                                        </div>
                                    </form>
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
                                            {makes?.data?.map(make => {
                                                return (
                                                    <tr key={make.id}>
                                                        <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                            {make.id}
                                                        </td>
                                                        <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                            {make.name}
                                                        </td>
                                                        <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                            <time
                                                                dateTime={
                                                                    make.created_at
                                                                }>
                                                                {
                                                                    make.created_at
                                                                }
                                                                {/* {format(
                                                                parse(
                                                                    make.created_at,
                                                                ),
                                                                'x',
                                                            )} */}
                                                            </time>
                                                        </td>
                                                        <td className="border border-slate-300 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                            {make.updated_at}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Make
