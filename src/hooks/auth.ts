import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ErrorMessages, ResponseWrapper, User } from '@/interfaces/interfaces'
import { isAxiosError } from 'axios'

interface UseAuthParams {
    middleware?: string
    redirectIfAuthenticated?: string
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: UseAuthParams = {}) => {
    const router = useRouter()
    const {
        data: user,
        error,
        mutate,
    } = useSWR(
        '/api/user',
        url =>
            axios
                .get(url)
                .then(res => res.data.data)
                .catch(error => {
                    if (error.response?.status !== 409) {
                        throw error
                    }
                    router.push('/verify-email')
                }),
        {
            // shouldRetryOnError: false,
        },
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    interface RegisterParams {
        name: string
        email: string
        password: string
        password_confirmation: string
        setErrors: React.Dispatch<React.SetStateAction<ErrorMessages>>
    }

    const register = async ({ setErrors, ...props }: RegisterParams) => {
        await csrf()

        setErrors({})

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) {
                    throw error
                }
                setErrors(error.response.data.errors)
            })
    }

    interface LoginParams {
        email: string
        password: string
        remember: boolean
        setErrors: React.Dispatch<React.SetStateAction<ErrorMessages>>
        setStatus: React.Dispatch<React.SetStateAction<string | null>>
    }

    const login = async ({ setErrors, setStatus, ...props }: LoginParams) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (isAxiosError(error)) {
                    if (error?.response?.status == 422) {
                        console.log(error)
                        const errs = error?.response?.data
                            .errors as ErrorMessages
                        setErrors(errs)
                        return
                    }
                }
                setErrors({})
                alert(error.message)
            })
    }

    interface ForgotPasswordParams {
        email: string
        setErrors: React.Dispatch<React.SetStateAction<ErrorMessages>>
        setStatus: React.Dispatch<React.SetStateAction<string | null>>
    }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: ForgotPasswordParams) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    interface ResetPasswordParams {
        email: string
        password: string
        password_confirmation: string
        setErrors: React.Dispatch<React.SetStateAction<ErrorMessages>>
        setStatus: React.Dispatch<React.SetStateAction<string | null>>
    }

    const resetPassword = async ({
        setErrors,
        setStatus,
        ...props
    }: ResetPasswordParams) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    interface ResendEmailVerificationParams {
        setStatus: React.Dispatch<React.SetStateAction<string | null>>
    }

    const resendEmailVerification = ({
        setStatus,
    }: ResendEmailVerificationParams) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated!)
        }
        if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
