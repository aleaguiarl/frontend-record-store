import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import logo from "../../src/assets/logo.svg";
import profile_icon from "../../src/assets/profile_icon.jpeg";
import { useAuth } from "@/hooks/UseAuth";

export default function Header() {
  const { logout } = useAuth();
  const { ...userData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full min-h-[70px] flex flex-wrap items-center justify-between px-3 py-2 sm:px-20 sticky top-0 max-w-screen bg-zinc-400/80 shadow-md">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center justify-center flex-col sm:flex-row"
      >
        <img src={logo} className="h-10" alt="Website logo" />
        <h1 className="text-white text-xl ml-2">BootPlay</h1>
      </button>
      <nav className="space-x-3 sm:space-x-6 flex flex-row items-center justify-center">
        <Link to="/my-collection" className="text-white">
          Meus Discos
        </Link>
        <Link to="/dashboard" className="text-white">
          Carteira
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="ring-0">
            <button>
              <img
                src={profile_icon}
                alt="Ícone de foto de perfil"
                className="rounded-full h-10"
              ></img>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{userData.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="flex items-center" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" />
                <span className="text-black text-sm">Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
