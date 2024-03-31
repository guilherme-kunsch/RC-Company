import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Historic } from "./pages/Historic";
import { Alerts } from "./pages/Alerts";
import { Logout } from "../pages/Logout";
import { LoginInitial } from "./pages/LoginInitial";

const Router = () => {
  return (
      <>
        <Route path='/' element={<LoginInitial />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/historico" element={<Historic />} />
        <Route path="/alertas" element={<Alerts />} />
        <Route path="/sair" element={<Logout />} />
        </>
  );
}

export default Router;
