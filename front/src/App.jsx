import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router";
import LogPage from "./pages/log.jsx";
import SignPage from "./pages/sign.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LogPage/>,
    },
    {
        path: "/signin",
        element: <SignPage/>
    }
]);
function App() {
  return (
        <RouterProvider router={router} />
  );
}
export default App;
