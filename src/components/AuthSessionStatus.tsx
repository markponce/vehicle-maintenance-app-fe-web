interface Props extends React.HTMLAttributes<HTMLDivElement> {
    status: string | null
}

const AuthSessionStatus = ({ status, className, ...props }: Props) => (
    <>
        {status && (
            <div
                className={`${className} text-sm font-medium text-green-600`}
                {...props}>
                {status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
