import { PropsWithChildren } from 'react'

const Label = ({
    className = '',
    children,
    ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLLabelElement>>) => (
    <label
        className={`${className} block text-sm font-medium text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
