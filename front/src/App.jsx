import Homepage from "./pages/Home.page.jsx";
import Missionpage from "./pages/Mission.page.jsx";
import './main.css';
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/mission",
        element: <Missionpage />,
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
