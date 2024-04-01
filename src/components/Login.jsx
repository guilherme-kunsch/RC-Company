import { Logo } from "../components/Logo";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword  } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig";


export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  function handleSign(e) {
    e.preventDefault()
    signInWithEmailAndPassword(email, password)
    navigate('/home');
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
            onChange={(e) => setEmail(e.target.value)}
            className="text-black p-1"
          />
          <label htmlFor="senha" className="mb-2">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            className="text-black p-1"
          />
          <span>
            <a href="#">Esqueceu sua senha?</a>
          </span>
          <button onClick={handleSign} className="bg-black">Entrar</button>
        </div>
      </div>
    </div>
  );
}