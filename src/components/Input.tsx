const Input = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'input'>) => (
    <input
        className={`${className} rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
