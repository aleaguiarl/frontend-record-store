import { UserModel } from "@/models/userModel";
import { album_api, user_api } from "@/services/apiService";
import { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextModel extends UserModel {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<UserModel>();

  useEffect(() => {
    const data: UserModel = JSON.parse(
      localStorage.getItem("@Auth.Data") || "{}"
    );

    if (data.id) {
      setUserData(data);
    } else {
      logout();
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const respAuth = await user_api.post("/users/auth", { email, password });

    if (respAuth instanceof Error) {
      return respAuth.message;
    }

    user_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
    album_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;

    const respUserInfo = await user_api.get(`/users/${respAuth.data.id}`);

    if (respUserInfo instanceof Error) {
      return respUserInfo.message;
    }

    localStorage.setItem("@Auth.Token", JSON.stringify(respAuth.data.token));
    localStorage.setItem("@Auth.Data", JSON.stringify(respUserInfo.data));
    setUserData(respUserInfo.data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(`@Auth.Data`);
    localStorage.removeItem(`@Auth.Token`);
    setUserData(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!localStorage.getItem("@Auth.Data"),
        ...userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
