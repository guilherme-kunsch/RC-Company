import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyABYA7J7f6Veaat-HZ9hInYHxKdz_iwz6g",
  authDomain: "fir-auth-97305.firebaseapp.com",
  databaseURL: "https://fir-auth-97305-default-rtdb.firebaseio.com",
  projectId: "fir-auth-97305",
  storageBucket: "fir-auth-97305.appspot.com",
  messagingSenderId: "431374030043",
  appId: "1:431374030043:web:3f7eddeb1a4321066228fe",
  measurementId: "G-84F8MS1MEX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Obtenha a instância de autenticação (auth)
const database = getDatabase(app);

export { auth, database };