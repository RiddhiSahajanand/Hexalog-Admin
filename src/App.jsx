import AppRoutes from '../Routes'
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';


const App = () => {
    return (
        <>
            <AppRoutes />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default App;
