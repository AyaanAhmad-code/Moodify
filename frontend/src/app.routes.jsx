import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected"
import Home from "./features/home/pages/Home";
import HomeLanding from "./features/home/pages/HomeLanding";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <HomeLanding />
    },
    {
        path:"/app",
        element: <Protected><Home /></Protected>
    },
    {
        path:"/login",
        element: <Login />
    },
    {
        path:"/register",
        element:<Register />
    }
])