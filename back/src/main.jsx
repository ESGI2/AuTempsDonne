import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from "./pages/AdminLogin.jsx";
import ErrorPage from "./error-pages/404.jsx";
import Home from "./pages/Home.jsx";

const isAuthenticated = () => {
    const cookie = document.cookie;
    console.log(cookie)
    return document.cookie.includes("jwt");
};

// eslint-disable-next-line react/prop-types,react-refresh/only-export-components
const AuthenticatedRoute = ({ element }) => {
    if (isAuthenticated()) {
        return element;
    } else {
        alert("Vous n'êtes pas connecté")
        window.location.href = "/"; // Redirection vers la page de connexion
        return null;
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLogin />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin",
        element: <AuthenticatedRoute element={<Home />} />, // Utilisation de la vérification d'authentification
        // element: <Home />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);