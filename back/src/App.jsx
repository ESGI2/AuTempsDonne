import './main.css';
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
    }
]);


import AdminLogin from "./pages/AdminLogin.jsx";
import ErrorPage from "./error-pages/404.jsx";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import WarehouseStockPage from "./pages/WarehouseStockPage.jsx";

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;