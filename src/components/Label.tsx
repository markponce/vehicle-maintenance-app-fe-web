import { PropsWithChildren } from 'react'

const Label = ({
    className = '',
    children,
    ...props
}: PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>) => (
    <label
        className={`${className} block text-sm font-medium text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
