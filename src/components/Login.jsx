// import { Logo } from "../components/Logo";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  async function handleSign(e) {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Erro: " + errorMessage)
        alert(errorCode + "E-mail e senha inválidos!")
        
      })
  }

  return (
    <div className="w-[30rem]">
      <div className="bg-sky-900 p-6 rounded-md">
        <div className="flex justify-center text-white mb-4">
          {/* <Logo /> */}
          <span>RC Company</span>
        </div>
        <div className="flex text-white flex-col border-stone-100">
          <label htmlFor="email" className="">
            E-mail
          </label>
          <input
            type="email"
            required
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            className="text-black p-2 mb-4 rounded-md"
          />
          <label htmlFor="senha" className="">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            className="text-black p-2 rounded-md"
          />
          <div className="flex justify-between items-center">
            <Link to="/registrar">Crie sua conta aqui</Link>
            <span className="flex justify-end my-2">
              <a href="#">Esqueceu sua senha?</a>
            </span>
          </div>
          <button onClick={handleSign} className="bg-black p-2 rounded-md">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
