import { Logo } from "./Logo";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig";


export function RegisterLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useCreateUserWithEmailAndPassword(auth);
  
  
    function handleSignRegister(e) {
        e.preventDefault()
        createUserWithEmailAndPassword(email, password);
    }

    if(loading) {
      return (<p>Carregando....</p>);
    }

    return (
        <div className="w-[30rem]">
          <div className="bg-red-700 p-6">
            <div className="flex justify-center text-white mb-4">
              <Logo />
              <span>RC Company</span>
            </div>
            <div className="flex text-white flex-col border-stone-100">
              <label htmlFor="email" className="mb-2">E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black p-1"
              />
              <label htmlFor="senha" className="mb-2">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black p-1"
              />
              <button onClick={handleSignRegister} className="bg-black">Cadastrar</button>
            </div>
          </div>
        </div>
      );
}