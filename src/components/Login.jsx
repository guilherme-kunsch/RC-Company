import { Logo } from "../components/Logo";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyABYA7J7f6Veaat-HZ9hInYHxKdz_iwz6g",
  authDomain: "fir-auth-97305.firebaseapp.com",
  projectId: "fir-auth-97305",
});

const auth = getAuth();

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");


  async function handleUser() { 
    const user = await addDoc(userCollectionRef, {
      email,
      password,
    });
    console.log(user)
  }

  // async function handleUser(event) { 
  //   event.preventDefault()
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     alert("Usuário autenticado com sucesso!");
  //   } catch (error) {
  //     alert("Erro ao autenticar o usuário:", error.message);
  //   }
  // }

  //pegando o que ta salvo no banco
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="w-[30rem]">
      <div className="bg-red-700 p-6">
        <div className="flex justify-center text-white mb-4">
          <Logo />
          <span>RC Company</span>
        </div>
        <form className="flex text-white flex-col border-stone-100">
          <label className="mb-2">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black p-1"
          ></input>
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black p-1"
          ></input>
          <span>
            <a href="#">Esqueceu sua senha?</a>
          </span>
          <button onClick={handleUser} className="bg-black">Entrar</button>
          <div>
            <ul>
              {users.map((user) => {
                return (
                  <div key={user.id}>
                    <li>{user.email}</li>
                    <li>{user.senha}</li>
                  </div>
                )
              })}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
