import { BrowserRouter, createBrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Historic } from "./pages/Historic";
import { Alerts } from "./pages/Alerts";
import { Logout } from "./pages/Logout";
import { LoginInitial } from "./pages/LoginInitial";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <LoginInitial />
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
    },
    {
        path: "/alertas",
        element: <Logout />
    },
    {
        path: "/sair",
        element: <Alerts />
    },
])

