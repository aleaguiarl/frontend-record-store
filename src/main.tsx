import ReactDOM from "react-dom/client";
import "./global.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import MyCollection from "./pages/myCollection/MyCollection";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-collection" element={<MyCollection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.Fragment>
);
