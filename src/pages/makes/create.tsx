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
import { useStoreMake } from '@/hooks/make'
import { toast } from 'react-toastify'
import MyModal from '@/components/MyModal'

const Create = () => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState('')
    const { newMake, error, trigger, isMutating, reset } = useStoreMake({
        throwOnError: false,
        onSuccess: async (data, key, config) => {
            reset()
            toast('A new Make has been created!', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
            })
            await router.replace(`/makes/`)
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
        //     console.log({ data, newMake })
        //     return data
        // },
        // populateCache: (updatedTodo, todos) => {
        //     console.log({ updatedTodo, todos })
        //     return [...todos, updatedTodo]
        // },
    })
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    New Make
                </h2>
            }>
            <Head>
                <title>Laravel - New Make</title>
            </Head>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm  sm:rounded-lg">
                        <div className="border-b border-gray-200  bg-white p-6">
                            <div>
                                <MyModal
                                    isOpen={isModalOpen}
                                    title={
                                        <h3 className="text-center">
                                            Create Make
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
                                                    trigger({ name })
                                                    setIsModalOpen(false)
                                                }}>
                                                Yes
                                            </Button>
                                        </div>
                                    }
                                />
                                {/* <div>error: {JSON.stringify(error)}</div>
                                <div>data: {JSON.stringify(make)}</div> */}
                                <form
                                    className="mb-4 space-y-4"
                                    onSubmit={e => {
                                        e.preventDefault()
                                        setIsModalOpen(true)
                                    }}>
                                    <div className="flex justify-between">
                                        <ButtonLink
                                            style={{
                                                pointerEvents: isMutating
                                                    ? 'none'
                                                    : 'auto',
                                            }}
                                            href="/makes"
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
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            {'\u00A0'}
                                            CANCEL
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
                                                placeholder={
                                                    'E.g. Yamaha, Honda, Kawasaki, etc...'
                                                }
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
