import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import Label from '@/components/Label'
import ButtonLink from '@/components/ButtonLink'
import Button from '@/components/Button'
import { useState } from 'react'
import { useDeleteMake } from '@/hooks/make'
import MyModal from '@/components/MyModal'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const Show = ({ data: selectedMake }) => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [selectedMakeId, setSelectedMakeId] = useState(null)

    const { trigger } = useDeleteMake({
        options: {
            rollbackOnError: true,
            onSuccess: async (data, key, config) => {
                toast('Selected Make has been deleted', {
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
                    View Make ID - {selectedMake.id}
                </h2>
            }>
            <Head>
                <title>View Make ID - {selectedMake.id}</title>
            </Head>
            <MyModal
                id="delete-modal"
                isOpen={isModalOpen}
                title={<h3 className="text-center">Delete Make</h3>}
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
                                trigger({ selectedMakeId })
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
                                        <div class="space-x-2">
                                            <Button
                                                onClick={() => {
                                                    setIsModalOpen(true)
                                                    setSelectedMakeId(
                                                        selectedMake.id,
                                                    )
                                                }}>
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
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                                <span className="ml-2">
                                                    DELETE
                                                </span>
                                            </Button>

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
                                    </div>
                                    {/* Name */}
                                    <div className="">
                                        <Label htmlFor="name">Name</Label>
                                        <div className="">
                                            {selectedMake?.name}
                                        </div>
                                    </div>
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
