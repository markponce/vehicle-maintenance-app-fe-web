import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}

export default App
