import { Logo } from "./Logo";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";


export function RegisterLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(getAuth);

  const navigate = useNavigate();

  function handleSignRegister(e) {
      e.preventDefault();
      
      if (!email || !password) {
          alert("Por favor, preencha todos os campos.");
          return;
      }

      createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Usuário cadastrado com sucesso!");
            navigate("/")
        })
        .catch((error) => {
            alert("Erro ao cadastrar usuário: " + error.message);
        });
  }

    return (
        <div className="w-[30rem]">
          <div className="bg-sky-900 p-6 rounded-md">
            <div className="flex justify-center text-white mb-4">
              <Logo />
              <span>RC Company</span>
            </div>
            <div className="flex text-white flex-col border-stone-100">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black p-2 mb-4 rounded-md"
              />
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black p-2 mb-4 rounded-md"
              />
              <button onClick={handleSignRegister} className="bg-black p-2 rounded-md">Cadastrar</button>
            </div>
          </div>
        </div>
      );
}