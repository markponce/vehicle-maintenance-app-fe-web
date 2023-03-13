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
import { useUpdateMake } from '@/hooks/make'
import { toast } from 'react-toastify'
import MyModal from '@/components/MyModal'
import { showErrorPage } from '@/utility/page-util'

const Edit = ({ data: selectedMake, err }) => {
    const router = useRouter()

    if (err?.statusCode) {
        return showErrorPage(err.statusCode)
    }

    const [name, setName] = useState(selectedMake.name)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { editedMake, error, trigger, isMutating, reset } = useUpdateMake({
        makeId: selectedMake.id,
        options: {
            throwOnError: false,
            onSuccess: async (data, key, config) => {
                reset()
                toast('Selected Make has been updated!', {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'success',
                })
                await router.replace(`/makes/${data.id}`)
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
        },
    })

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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>{' '}
                    Edit Make ID - {selectedMake.id}
                </h2>
            }>
            <Head>
                <title>{`Laravel - Edit Make ID - ${selectedMake.id}`}</title>
            </Head>
            {/* <Toaster /> */}
            <MyModal
                isOpen={isModalOpen}
                title={<h3 className="text-center">Update Make</h3>}
                message={<p className="text-center">Are your sure?</p>}
                // onClose={() => alert(123)}
                buttons={
                    <div className="flex justify-between">
                        <Button onClick={() => setIsModalOpen(false)}>
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false)
                                trigger({ name })
                            }}>
                            Yes
                        </Button>
                    </div>
                }
            />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm  sm:rounded-lg">
                        <div className="border-b border-gray-200  bg-white p-6">
                            <div>
                                {/* <div>error: {JSON.stringify(error)}</div>
                                <div>data: {JSON.stringify(editedMake)}</div> */}
                                <form
                                    className="mb-4 space-y-4"
                                    onSubmit={e => {
                                        e.preventDefault()
                                        setIsModalOpen(true)
                                    }}>
                                    {/* <ToastContainer /> */}

                                    <div className="flex justify-between">
                                        <ButtonLink
                                            style={{
                                                pointerEvents: isMutating
                                                    ? 'none'
                                                    : 'auto',
                                            }}
                                            href={`/makes/${selectedMake.id}`}
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
                                            className=""
                                            disabled={isMutating}>
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
                                            UPDATE
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
                                                onChange={event => {
                                                    setName(event.target.value)
                                                    reset()
                                                }}
                                                className="mt-1 block w-full"
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

export async function getServerSideProps(context) {
    const { query, req } = context
    const { id } = query
    try {
        const res = await axios.get(`api/makes/${id}`, {
            headers: {
                origin: process.env.NEXT_PUBLIC_BACKEND_URL,
                Cookie: req.headers.cookie,
            },
        })
        const data = res.data.data
        return { props: { data, err: {} } }
    } catch (e) {
        return {
            props: {
                data: {},
                err: { statusCode: e.response.status },
            },
        }
    }
}

export default Edit
