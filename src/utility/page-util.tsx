import ForbiddendPage from '@/pages/403'
import NotFoundPage from '@/pages/404'

export const showErrorPage = (statusCode: number): JSX.Element | void => {
    if ([403, 404].includes(statusCode)) {
        switch (statusCode) {
            case 403:
                return <ForbiddendPage />
            case 404:
                return <NotFoundPage />
            default:
                return <></>
        }
    }
}
