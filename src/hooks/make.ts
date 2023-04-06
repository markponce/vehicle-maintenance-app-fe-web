import useSWR, { SWRConfiguration } from 'swr'
import axios from '@/lib/axios'
import delay from '@/utility/delay'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import { isAxiosError } from 'axios'
import { ErrorMessages, Make, ResponseWrapper } from '@/interfaces/interfaces'

export const useGetMakes = () => {
    const {
        data: makes,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR('api/makes', async url => {
        try {
            const res = await axios.get(url)
            console.log(res)
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

export const useStoreMake = (
    options:
        | SWRMutationConfiguration<
              Make,
              ErrorMessages,
              { name: string },
              'api/makes',
              Make[]
          >
        | undefined,
) => {
    const {
        data: newMake,
        error,
        trigger,
        isMutating,
        reset,
    } = useSWRMutation<Make, ErrorMessages, 'api/makes', { name: string }>(
        'api/makes',
        async (url, { arg }) => {
            // await delay(1000)
            try {
                const response = await axios.post(url, arg)
                return response.data.data
            } catch (err) {
                if (isAxiosError(err)) {
                    if (err.response?.status == 422) {
                        throw err.response.data.errors
                    }
                }
                throw err
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

interface UseUpdateMakeParams {
    makeId: number
    options?:
        | SWRMutationConfiguration<
              Make,
              ErrorMessages,
              { name: string },
              [string, number],
              any
          >
        | undefined
}

export const useUpdateMake = ({ makeId, options }: UseUpdateMakeParams) => {
    const {
        data: editedMake,
        error,
        trigger,
        isMutating,
        reset,
    } = useSWRMutation<Make, ErrorMessages, [string, number], { name: string }>(
        ['api/makes', makeId],
        async ([url, id], { arg }) => {
            try {
                const response = await axios.put(`${url}/${id}`, arg)
                return response.data.data
            } catch (err) {
                if (isAxiosError(err)) {
                    if (err.response?.status == 422) {
                        throw err.response.data.errors
                    }
                }
                throw err
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

interface UseDeleteMakeMakeParams {
    options?:
        | SWRMutationConfiguration<
              Make,
              any,
              { selectedMakeId: number },
              string,
              any
          >
        | undefined
}

export const useDeleteMake = ({ options }: UseDeleteMakeMakeParams) => {
    const {
        data: deleteMake,
        error,
        trigger,
        isMutating,
        reset,
    } = useSWRMutation<
        any,
        any,
        string,
        {
            selectedMakeId: number
        }
    >(
        'api/makes',
        async (url, { arg }) => {
            // await delay(1000)
            const { selectedMakeId } = arg
            try {
                const response = await axios.delete(`${url}/${selectedMakeId}`)
                return response.data.data
            } catch (err) {
                throw err
            }
        },
        {
            ...options,
        },
    )

    return {
        deleteMake,
        error,
        trigger,
        isMutating,
        reset,
    }
}
