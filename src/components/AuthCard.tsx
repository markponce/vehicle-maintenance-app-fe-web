import { PropsWithChildren } from 'react'

interface Props {
    logo: React.ReactNode
}

const AuthCard = ({ logo, children }: PropsWithChildren<Props>) => (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
        <div>{logo}</div>

        <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
