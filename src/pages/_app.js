import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}

export default App
