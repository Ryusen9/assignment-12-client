import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../Layouts/HomeLayout";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HomeLayout/>,
            }
        ]
    }
])

export default routers;