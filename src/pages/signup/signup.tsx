import { FormEvent, useState } from "react";
import Input from "../../components/Input";
import { user_api } from "../../services/apiService";
import { toast } from "react-hot-toast";
import logo from "../../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(event: FormEvent) {
    setLoading(true);
    event.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    await user_api
      .post("/users/create", data)
      .then(() => {
        toast.success("Conta criada com sucesso!");
        setLoading(false);
        navigate("/login");
      })
      .catch(() => {
        toast.error("Houve um erro ao criar a conta");
        setLoading(false);
      });
  }

  return (
    <main className="w-full h-screen flex items-center justify-center bg-default-background bg-cover bg-center bg-no-repeat">
      <div className="flex justify-center items-center w-full h-full backdrop-blur backdrop-brightness-50">
        <div className="flex flex-col bg-white rounded-2xl h-fit w-full max-w-[380px] items-center px-10 py-6 shadow-md">
          <img src={logo} className="h-10 m-1" alt="Website logo" />
          <h1 className="text-2xl font-medium">Criar conta</h1>
          <form
            onSubmit={handleSignup}
            className="flex flex-col w-full mt-5 gap-2"
          >
            <Input
              onChange={(event) => setName(event.target.value)}
              type="text"
              required
            >
              Nome Completo
            </Input>
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
                Criar conta
              </Button>
            )}
          </form>
          <span className="truncate font-thin text-xs mt-6">
            Já tem uma conta?{" "}
            <Link to="/login" className="underline font-semibold">
              Entrar
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}
