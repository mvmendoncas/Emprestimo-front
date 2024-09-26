"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setStorageItem } from "../../utils/localStorage";
import api from "../../api/http-common";
import { usePathname, useRouter } from "next/navigation";
import { showLogin } from "../redux/ui/uiSlice";
import { clearUserLogin } from "../redux/userLogin/userLoginSlice";

const Header = () => {
  const { isAuthenticated, roles } = useSelector((state) => ({
    isAuthenticated: state.userLogin.isAuthenticated,
    roles: state.userLogin.roles,
  }));

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    api.defaults.headers.authorization = "";
    setStorageItem("token", "");
    dispatch(clearUserLogin());
    setStorageItem("userlogin", "");
    router.push('/');
  };

  const handleShowLogin = () => {
    dispatch(showLogin());
    router.push('/');
  };

  const pathName = usePathname();

  if (pathName === "/" || pathName === "/newuser" || pathName === "/agiota/create" || pathName === "/customer/create") {
    return null;
  }

  const isCustomer = roles.includes("customer");
  const isAgiota = roles.includes("agiota");

  // Função para redirecionar com base na role
  const handleAgiotaClick = () => {
    if (isAgiota) {
      router.push('/agiota');
    } else if (isCustomer) {
      router.push('/customer');
    }
  };

  const configurationPath = isCustomer ? '/customer/configurations' : (isAgiota ? '/agiota/configurations' : null);

  return (
    <header className="bg-black text-white px-4 py-2">
      <div className={styles.Header}>
        {/* O link "Agiota" agora redireciona conforme a role */}
        <h1 
          className="text-2xl cursor-pointer" 
          onClick={handleAgiotaClick}
        >
          Agiota
        </h1>

        {configurationPath && (
          <Link href={configurationPath} className={styles.configuration__button}>
            <button className="text-white">
              Seu perfil
            </button>
          </Link>
        )}

        {isAgiota && (
          <>

            {/* Botão Criar Empréstimo */}
            <div className="flex justify-center space-x-4">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push('/borrowing/create')}
              >
                Criar Empréstimo
              </button>
            </div>

            {/* Botão Solicitações */}
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/agiota/requests')}
            >
              Solicitações
            </button>
          </>
        )}

        {isCustomer && (
          <>
            <button
              className={styles.configuration__button}
              onClick={() => router.push('/customer/borrowingsInProgress')}
            >
              Gerenciar seus empréstimos
            </button>

            <button
              className={styles.configuration__button}
              onClick={() => router.push('/borrowing/list')}
            >
              Novo Empréstimo
            </button>
          </>
        )}

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={"ml-auto bg-transparent hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}
          >
            Sair
          </button>
        ) : (
          <Link href="/">
            <button className="ml-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
