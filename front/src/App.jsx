import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Profiler} from "react";
import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router";
import LogPage from "./pages/log.jsx";
import SignPage from "./pages/sign.jsx";
import Homepage from './pages/Home.page.jsx';
import Missionpage from './pages/Mission.page.jsx';
import Donpage from "./pages/Don.page.jsx";
import ContactPage from "./pages/Contact.page.jsx";
import MainLog from "./logPages/Main.page.jsx";
import AuthRoute from "./utils/authentification.js";
import Profil from "./logPages/Profil.page.jsx";

const router = createBrowserRouter([
    {
        path: "/fr/home",
        element: <Homepage/>,
    },
    {
        path: "/en/home",
        element: <Homepage/>,
    },
    {
        path: "/fr/mission",
        element: <Missionpage/>,
    },
    {
        path: "/en/mission",
        element: <Missionpage/>,
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
        element: <Donpage/>,
    },
    {
        path: "/en/don",
        element: <Donpage/>,
    },
    {
        path: "/fr/login",
        element: <LogPage/>,
    },
    {
        path: "/en/login",
        element: <LogPage/>,
    },
    {
        path: "/fr/signin",
        element: <SignPage/>
    },
    {
        path: "/en/signin",
        element: <SignPage/>
    },
    {
        path: "/fr/main",
        element: <AuthRoute element={<MainLog/>}/>
    },
    {
        path: "/en/main",
        element: <AuthRoute element={<MainLog/>}/>
    }, {
        path: "/fr/profil",
        element: <AuthRoute element={<Profil/>}/>
    }, {
        path: "/en/profil",
        element: <AuthRoute element={<Profil/>}/>
    },


]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
