import AppRoutes from '../Routes'
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from './component/Loader/Loader';


const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Show the loader for 2 seconds on route change
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [location]);

    // Display loader during page reload or navigation
    // useEffect(() => {
    //     const handleBeforeUnload = () => setIsLoading(true);

    //     // Add event listener for beforeunload
    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => {
    //         // Cleanup the event listener
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);

    return (
        <>
            {/* {isLoading === true ? <Loader /> : */}
            <>
                <AppRoutes />
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </>
            {/* } */}
        </>
    )
}

export default App;



