"use client";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import api from "../../api/http-common";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../redux/userLogin/userLoginSlice";
import { postLogin } from "../../api/auth/postLogin";
import { setStorageItem } from "../../utils/localStorage";
import style from "./login.module.css";
import { hideLogin } from "../redux/ui/uiSlice";
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
          const userId = res.data.userId;

          api.defaults.headers.authorization = `Bearer ${token}`;
          setStorageItem("token", token);
          setStorageItem("userId", userId);

          dispatch(setUserLogin({ username: login, roles, userId }));
          setStorageItem("userlogin", login);

          dispatch(hideLogin());
          router.push('/home');
        },
        onError: (erro) => {
          console.error("Erro no login:", erro);
          
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
      <div className="container mx-auto mt-10 p-6 col-md-2">
        <div className={style.login__title}>
          <h2 className={style.title}>A.G.I.O.T.A</h2>
        </div>
        <div className={style.login__form}>
          <h3 className={style.subtitle}>Entrar</h3>
          <label htmlFor="email" className={style.login__content__label}>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    required
                />
          </label>
            <label htmlFor="password" className={style.login__content__label}>
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onKeyUp={handleEnterKey}
                    required
                />
              </label>
              {loginMutation.status === "error" && (
                  <p className={style.login__content_errorLogin}>Erro no login...</p>
              )}
        </div>
          <div className={style.login__button}>
              <div className={style.createAccountLink}>
                  <Link href="/newuser">
                      Criar Conta
                  </Link>
              </div>
              <button
                  className={`${style.login__content__button_login} ${
                      (loginMutation.status === "loading" || loginMutation.status === "success") ? style.active : ""
                  }`}
                  onClick={() => loginMutation.mutate()}
                  disabled={loginMutation.status === "loading"}
              >
                  {loginMutation.status === "loading" ? "Carregando..." : "ENTRAR"}
              </button>
          </div>
      </div>
  );
};

export default Login;
