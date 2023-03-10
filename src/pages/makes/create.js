import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useState } from 'react'
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

const Create = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const { newMake, error, trigger, isMutating, reset } = useStoreMake({
        throwOnError: false,
        onSuccess: async (data, key, config) => {
            reset()
            toast.success('A new Make has been created!', { duration: 6000 })
            await router.replace(`/makes`)
        },
        onError: (err, key, config) => {
            if (typeof err == 'string') {
                toast.error(err)
            }
        },
    })
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Make - Create
                </h2>
            }>
            <Head>
                <title>Laravel - Make Create</title>
            </Head>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm  sm:rounded-lg">
                        <div className="border-b border-gray-200  bg-white p-6">
                            <div>
                                {/* <div>error: {JSON.stringify(error)}</div>
                                <div>data: {JSON.stringify(make)}</div> */}
                                <form
                                    className="mb-4 space-y-4"
                                    onSubmit={e => {
                                        e.preventDefault()
                                        trigger({ name })
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
                                        <Button
                                            disabled={isMutating}
                                            className="">
                                            {isMutating ? (
                                                <Spinner />
                                            ) : (
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
                                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                                    />
                                                </svg>
                                            )}
                                            {'\u00A0'}
                                            Save
                                        </Button>
                                    </div>
                                    {/* Name */}
                                    <div className="">
                                        <Label htmlFor="name">Name</Label>

                                        <div className="">
                                            <Input
                                                disabled={isMutating}
                                                id="name"
                                                type="text"
                                                value={name}
                                                className="mt-1 block w-full"
                                                onChange={event => {
                                                    setName(event.target.value)
                                                    reset()
                                                }}
                                                required
                                                autoFocus
                                            />
                                        </div>

                                        <InputError
                                            messages={error?.name}
                                            className="mt-2"
                                        />
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

export default Create
