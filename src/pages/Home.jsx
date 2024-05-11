import React from "react";
import { Navbar } from "../components/Navbar";

export function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-8 w-3/4 mx-auto bg-slate-700 p-4 rounded-md text-white">
        <div className="text-center font-bold text-2xl">
          <h1>Projeto Interdisciplinar 3</h1>
        </div>
        <div className="mt-4">
          <h2>Projeto Extensionista Agricultura Inteligente</h2>
          <p>Fertirrigação</p>
        </div>
      </div>
    </div>

  );
  
};

