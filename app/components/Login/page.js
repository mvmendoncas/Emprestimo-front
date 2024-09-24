// app/components/Login/page.js
"use client";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import BackgroundDropdownCenter from "../backgroundDropdownCenter/page";
import api from "../../api/http-common";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../redux/userLogin/userLoginSlice";
import { postLogin } from "../../api/auth/postLogin";
import { setStorageItem } from "../../utils/localStorage";
import style from "./login.module.css";
import { hideLogin } from "../redux/ui/uiSlice";
import HomePage from "@/app/newuser/homepage/page";
import Link from "next/link";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();

  const loginMutation = useMutation(
    async () => {
      return postLogin(login, password);
    },
    {
      onSuccess: (res) => {
        const token = res.data.access_token;
        const roles = res.data.roles; 
        const userId = res.data.userId;// Extrai as roles da resposta

        api.defaults.headers.authorization = `Bearer ${token}`;
        setStorageItem("token", token);
        setStorageItem("userId", userId);

        // Despacha apenas uma vez com os dados corretos
        dispatch(setUserLogin({ username: login, roles, userId }));
        setStorageItem("userlogin", login);

        dispatch(hideLogin());
        router.push('/home'); 
      },
      onError: (erro) => {
        console.error("Erro no login:", erro);
        // Opcional: adicionar lógica para exibir uma mensagem de erro ao usuário
      },
    }
  );

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      loginMutation.mutate();
    }
  };

  const handleClose = () => {
    dispatch(hideLogin());
  };

  return (
    <BackgroundDropdownCenter>
      <div className={style.loginContent}>
        <div className={style.login__content}>
          <div className={style.login__title}>
            <h2 className={style.title}>Welcome back!</h2>
            <h3 className={style.subtitle}>Your organized world awaits...</h3>
          </div>
          <button
            className={style.login__content__button_close}
            onClick={handleClose}
            aria-label="Fechar janela de login"
          >
            <img src="/assets/close.svg" alt="fechar" />
          </button>
          <div className={style.login__form}>
            <label htmlFor="email" className={style.login__content__label}>
              <p>E-mail Address</p>
              <input
                type="email"
                name="email"
                placeholder="Enter your best e-mail"
                onChange={(e) => setLogin(e.target.value)}
                value={login}
                required
              />
            </label>
            <label htmlFor="password" className={style.login__content__label}>
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Enter a strong password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onKeyUp={handleEnterKey}
                required
              />
            </label>
            {loginMutation.status === "error" && (
              <p className={style.login__content_errorLogin}>Erro no login...</p>
            )}
            <button
              className={`${style.login__content__button_login} ${
                (loginMutation.status === "loading" || loginMutation.status === "success") ? style.active : ""
              }`}
              onClick={() => loginMutation.mutate()}
              disabled={loginMutation.status === "loading"}
            >
              {loginMutation.status === "loading" ? "Carregando..." : "Login"}
            </button>
          </div>
        </div>

        <Link href={"/newuser/homepage"}>
          criar conta
        </Link>
      </div>
    </BackgroundDropdownCenter>
  );
};

export default Login;
