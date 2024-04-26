import './main.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticatedRoute from "./utils/authentication.js";

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
    },
    {
        path: "/users",
        element: <AuthenticatedRoute element={<Users />} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/warehouse",
        element: <AuthenticatedRoute element={<WarehouseStockPage />} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/truck",
        element: <AuthenticatedRoute element={<TruckGestionPage />} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/calendar",
        element: <AuthenticatedRoute element={<CalendarPage />} />,
    },
    {
        path: "/maraude",
        element: <AuthenticatedRoute element={<MaraudePage />} />,
    }
]);


import AdminLogin from "./pages/AdminLogin.jsx";
import ErrorPage from "./error-pages/404.jsx";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import WarehouseStockPage from "./pages/WarehouseStockPage.jsx";
import TruckGestionPage from "./pages/TruckGestionPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import MaraudePage from "./pages/MaraudePage.jsx";
import {PrimeReactProvider} from "primereact/api";

function App() {
    return (
        <PrimeReactProvider>
            <RouterProvider router={router} />
        </PrimeReactProvider>
    );
}

export default App;