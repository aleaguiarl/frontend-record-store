import Input from "../../components/Input";
import logo from "../../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/hooks/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, []);

  async function handleLogin(event: FormEvent) {
    setLoading(true);
    event.preventDefault();

    login(email, password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Erro ao efetuar o login");
        setLoading(false);
      });
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <main className="w-full h-screen flex items-center justify-center bg-default-background bg-cover bg-center bg-no-repeat">
        <div className="flex justify-center items-center w-full h-full backdrop-blur backdrop-brightness-50">
          <div className="flex flex-col bg-white rounded-2xl h-fit w-full max-w-[380px] items-center p-6 shadow-md">
            <img src={logo} className="h-10 m-1" alt="Website logo" />
            <h1 className="text-2xl font-medium">Acesse sua conta</h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-11/12 mt-5 gap-2"
            >
              <Input
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
              >
                Email
              </Input>
              <Input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
              >
                Senha
              </Input>

              {loading ? (
                <Button disabled className="p-2 h-12 rounded-3xl transition">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="p-2 h-12 bg-zinc-900 text-white rounded-3xl transition"
                >
                  Entrar
                </Button>
              )}
            </form>
            <span className="truncate font-thin text-xs mt-6">
              Ainda não tem uma conta?{" "}
              <Link to="/signup" className="underline font-semibold">
                Inscrever-se
              </Link>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
