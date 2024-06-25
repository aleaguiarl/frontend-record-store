import logo from "../../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/UseAuth'

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated }  = useAuth();

  if(isAuthenticated) {
    navigate("/dashboard");
  }

  return (
    <main className="bg-default-background bg-center bg-cover bg-no-repeat h-screen w-full overflow-hidden">
      <div className="w-full h-full backdrop-brightness-50">
        <header className="flex flex-wrap items-center justify-between px-3 sm:px-20 py-2 sticky top-0 max-w-screen bg-zinc-400 shadow-md">
          <button 
          onClick={() => navigate("/login")}
          className="flex items-center justify-center flex-col sm:flex-row">
            <img src={logo} className="h-10" alt="Website logo" />
            <h1 className="text-white text-xl ml-2">BootPlay</h1>
          </button>

          <nav className="space-x-3 sm:space-x-4">
            <Button
              onClick={() => navigate("/login")}
              type="button"
              className="md:w-[200px] h-10 bg-zinc-900 text-white font-medium rounded-full transition"
            >
              Entrar
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              type="button"
              className="md:w-[200px] h-10 bg-[#9EE2FF] text-black font-medium rounded-full hover:bg-[#b1e8ff] transition"
            >
              Inscrever-se
            </Button>
          </nav>
        </header>
        <section className="w-full h-full flex flex-col items-start justify-center pl-10 max-w-[600px] gap-5">
          <p className="text-5xl text-white font-semibold">
            A história da música não pode ser esquecida!
          </p>
          <p className="text-xl text-white font-light">
            Crie já sua conta e curta os sucessos que marcaram os tempos no
            Vinil.
          </p>
          <Link to="/signup">
            <Button
              type="button"
              className="w-[200px] h-12 bg-[#9EE2FF] text-black text-base font-medium rounded-full hover:bg-[#b1e8ff] transition"
            >
              Inscrever-se
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
