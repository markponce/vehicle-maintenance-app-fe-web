import Link, { LinkProps } from 'next/link'
import { Menu } from '@headlessui/react'
import { PropsWithChildren } from 'react'

interface Prop {}

type DropdownLinkProps = LinkProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement>

const DropdownLink = ({
    children,
    ...props
}: PropsWithChildren<DropdownLinkProps>) => (
    <Menu.Item>
        {({ active }) => (
            <Link
                {...props}
                className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } transition duration-150 ease-in-out focus:outline-none`}>
                {children}
            </Link>
        )}
    </Menu.Item>
)

interface DropdownButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DropdownButton = ({
    children,
    ...props
}: PropsWithChildren<DropdownButtonProps>) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } transition duration-150 ease-in-out focus:outline-none`}
                {...props}>
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
