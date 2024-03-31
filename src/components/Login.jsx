import Logo from "../components/Logo";
export function Login() {
  return (
    <div className="max-w-[25rem] justify-center mx-auto border-2 border-red-700 p-4">
      <div className="flex justify-center text-white mb-6">
        <Logo />
        <span>RC Company</span>
      </div>
      <form className="flex text-white flex-col border-stone-100">
        <label className="mb-2">E-mail</label>
        <input className="text-black p-1"></input>
        <label>Senha</label>
        <input type="password" className="text-black p-1"></input>
        <span>
          <a href="#">Esqueceu sua senha?</a>
        </span>
        <button>Entrar</button>
      </form>
    </div>
  );
};
