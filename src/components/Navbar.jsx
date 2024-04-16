import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="sticky flex p-[2em] items-center shadow-lg shadow-black-500/40 bg-slate-700 font-bold">
      <div className="flex justify-between w-full">
        <Link to="/home">
          <div className="flex items-center gap-3 text-white ">
            <img src="./src/assets/logo.svg" alt="logo da empresa" />
            <h1>RC Company</h1>
          </div>
        </Link>
        <div className="flex gap-8 items-center text-white">
          <Link to="/alertas">Alertas</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/historico">Histórico</Link>
        </div>
      </div>
    </div>
  );
}
