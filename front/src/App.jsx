import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router";
import LogPage from "./pages/log.jsx";
import SignPage from "./pages/sign.jsx";
import Homepage from './pages/Home.page.jsx';
import Missionpage from './pages/Mission.page.jsx';
import Donpage from "./pages/Don.page.jsx";
import ContactPage from "./pages/Contact.page.jsx";

const router = createBrowserRouter([
    {
        path: "/fr/home",
        element: <Homepage />,
    },
    {
        path: "/en/home",
        element: <Homepage />,
    },
    {
        path: "/fr/mission",
        element: <Missionpage />,
    },
    {
        path: "/en/mission",
        element: <Missionpage />,
    },
    {
        path: "/fr/contact",
        element: <ContactPage/>,
    },
    {
        path: "/en/contact",
        element: <ContactPage/>,
    },
    {
        path: "/fr/don",
        element: <Donpage />,
    },
    {
        path: "/en/don",
        element: <Donpage />,
    },
    {
        path: "/login",
        element: <LogPage/>,
    },
    {
        path: "/signin",
        element: <SignPage/>
    },

]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
