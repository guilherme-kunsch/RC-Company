import React, { useState } from "react";
import { Navbar } from "../components/Navbar";

export function Historic() {
    const [dateInitial, setDateInitial] = useState("")
    const [dateFinal, setDateFinal] = useState("")

    function handleDate(e) {
        e.preventDefault()
        console.log(dateInitial)
        console.log(dateFinal)

    }

  return (
    <div>
      <Navbar />

      <div className="mt-8 w-2/4 mx-auto bg-slate-700 p-4 rounded-md">
        <div className="text-white font-bold text-2xl text-center">
          <h1>Gerar Relatório</h1>
        </div>
        <div className="flex justify-between mt-8 p-2">
          <div className="flex justify-between w-[50rem]">
            <input 
                className="rounded-md h-10" 
                type="date" 
                onChange={(e) => setDateInitial(e.target.value)}
            />
            <input 
                className="rounded-md h-10" 
                type="date" 
                onChange={(e) => setDateFinal(e.target.value)}

            />
          </div>
          <button 
            className="rounded-md text-white bg-green-500 w-16 h-10 hover:bg-green-400"
            onClick={handleDate}
            >
            Excel
          </button>
        </div>
      </div>
      <div className="mt-8 w-2/4 mx-auto bg-slate-700 p-4 rounded-md">
        <ul className="text-white flex justify-between">
            <li>teste</li>
            <li>teste</li>
            <li>teste</li>
            <li>teste</li>
            <li>teste</li>
        </ul>
        <hr />
      </div>
    </div>
  );
}
