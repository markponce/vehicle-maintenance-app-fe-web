import useSWR from 'swr'
import axios from '@/lib/axios'
import delay from '@/utility/delay'
import useSWRMutation from 'swr/mutation'

export const useGetMakes = () => {
    const {
        data: makes,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR('/api/makes', async url => {
        // await delay(1000)
        try {
            const res = await axios.get(url)
            return res.data.data
        } catch (err) {
            throw err
        }
    })
    return {
        makes,
        error,
        isLoading,
        isValidating,
        mutate,
    }
}

export const useStoreMake = (options = {}) => {
    const {
        data: newMake,
        error,
        trigger,
        isMutating,
        reset,
    } = useSWRMutation(
        'api/makes',
        async (url, { arg }) => {
            // await delay(1000)
            try {
                const response = await axios.post(url, arg)
                return response.data.data
            } catch (err) {
                if (err.response.status == 422) {
                    throw err.response.data.errors
                }
                throw err.message
            }
        },
        {
            throwOnError: true,
            ...options,
        },
    )
    return {
        newMake,
        error,
        trigger,
        isMutating,
        reset,
    }
}

export const useUpdateMake = ({ makeId, options = {} } = {}) => {
    const {
        data: editedMake,
        error,
        trigger,
        isMutating,
        reset,
    } = useSWRMutation(
        ['api/makes', makeId],
        async ([url, id], { arg }) => {
            // await delay(1000)
            try {
                const response = await axios.put(`${url}/${id}`, arg)
                return response.data.data
            } catch (err) {
                if (err.response.status == 422) {
                    throw err.response.data.errors
                }
                throw err.message
            }
        },
        {
            throwOnError: true,
            ...options,
        },
    )

    return {
        editedMake,
        error,
        trigger,
        isMutating,
        reset,
    }
}
