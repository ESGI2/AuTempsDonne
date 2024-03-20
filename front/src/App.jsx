import React from 'react';
import Homepage from "./pages/Home.page.jsx";
import Missionpage from "./pages/Mission.page.jsx";
import './main.css';
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Contactpage from "./pages/Contact.page.jsx";

const router = createBrowserRouter([
    {
        path: "/:lang(fr|en)/",
        element: <Homepage />,
    },
    {
        path: "/:lang(fr|en)/mission",
        element: <Missionpage />,
    },
    {
        path: "/:lang(fr|en)/contact",
        element: <Contactpage />,
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
