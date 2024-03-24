import './main.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin.jsx";
import ErrorPage from "./error-pages/404.jsx";
import Home from "./pages/Home.jsx";
import {useEffect, useState} from "react";
import ky from "ky";

const isAuthenticated = () => {
    return document.cookie.includes("jwt");
};

// eslint-disable-next-line react/prop-types
const AuthenticatedRoute = ({ element }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ky.get('http://localhost:3000/user/me', {
                    credentials: 'include'
                }).json();
                setUserData(response);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserData(null);
            }
        };

        if (isAuthenticated()) {
            fetchUserData();
        } else {
            window.location.href = "/";
        }
    }, []);

    return isAuthenticated() && userData ? element : null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLogin />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin",
        element: <AuthenticatedRoute element={<Home />} />,
        errorElement: <ErrorPage />,
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}
export default App;
