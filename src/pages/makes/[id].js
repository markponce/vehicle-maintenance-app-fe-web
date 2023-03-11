import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Button from '@/components/Button'
import ButtonLink from '@/components/ButtonLink'
import Spinner from '@/components/Spinner'
import useSWRMutation from 'swr/mutation'
import toast, { Toaster } from 'react-hot-toast'
import delay from '@/utility/delay'
import { useStoreMake } from '@/hooks/make'
import useSWR from 'swr'
import { csrf } from '@/hooks/auth'

const Show = ({ data: selectedMake }) => {
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
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
                    View Make ID - {selectedMake.id}
                </h2>
            }>
            <Head>
                <title>View Make ID - {selectedMake.id}</title>
            </Head>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm  sm:rounded-lg">
                        <div className="border-b border-gray-200  bg-white p-6">
                            <div>
                                {/* <div>error: {JSON.stringify(error)}</div>
                                <div>data: {JSON.stringify(selectedMake)}</div> */}

                                <form
                                    className="mb-4 space-y-4"
                                    onSubmit={e => {
                                        e.preventDefault()
                                    }}>
                                    <div className="flex justify-between">
                                        <ButtonLink href="/makes" className="">
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
                                                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                                />
                                            </svg>
                                            {'\u00A0'}
                                            List
                                        </ButtonLink>
                                        <ButtonLink
                                            href={`/makes/edit/${selectedMake.id}`}
                                            className="">
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
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                            {'\u00A0'}
                                            Edit
                                        </ButtonLink>
                                    </div>
                                    {/* Name */}
                                    <div className="">
                                        <Label htmlFor="name">Name</Label>

                                        <div className="">
                                            {/* <Input
                                                disabled
                                                id="name"
                                                type="text"
                                                value={selectedMake?.name}
                                                className="mt-1 block w-full"
                                                required
                                                autoFocus
                                            /> */}
                                            {selectedMake?.name}
                                        </div>

                                        {/* <InputError
                                            messages={[]}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    {/* <div className=" mt-2 text-right"></div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export async function getServerSideProps(context) {
    const { query, req } = context
    const { id } = query
    const res = await axios.get(`api/makes/${id}`, {
        headers: {
            origin: process.env.NEXT_PUBLIC_BACKEND_URL,
            Cookie: req.headers.cookie,
        },
    })
    const data = res.data.data
    return { props: { data } }
}

export default Show
