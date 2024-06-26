import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Historic } from "./pages/Historic";
import { LoginInitial } from "./pages/LoginInitial";
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginInitial />
    },
    {
        path: "/registrar",
        element: <Register />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/historico",
        element: <Historic />
    }
])

