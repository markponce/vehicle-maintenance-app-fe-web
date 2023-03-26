import Link, { LinkProps } from 'next/link'

// interface props extends LinkProps, React.HTMLProps<HTMLAnchorElement> {
//     className: string
// }

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

const ButtonLink = ({
    className,
    children,
    ...props
}: React.PropsWithChildren<Props>) => (
    <Link
        className={`${className} inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 focus:border-gray-900 focus:outline-none focus:ring active:bg-gray-900 disabled:opacity-25`}
        {...props}>
        {children}
    </Link>
)

export default ButtonLink
