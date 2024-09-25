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
    router.push('/')
  };

  const pathName = usePathname();

  if (pathName === "/" || pathName === "/newuser" || pathName === "/agiota/create" || pathName === "/customer/create") {
    return null;
  }

  const isCustomer = roles.includes("customer");
  const isAgiota = roles.includes("agiota");

  const configurationPath = isCustomer ? '/customer/configurations' : (isAgiota ? '/agiota/configurations' : null);

  return (
    <header className="bg-blue-800 text-white p-4">
      <div className={styles.Header}>
        <Link href="/">
          <h1 className="text-2xl">Agiota</h1>
        </Link>

        {configurationPath && (
          <Link href={configurationPath}>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Configurações
            </button>
          </Link>
        )}

        {isCustomer && (
          <>
            <button 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
              onClick={() => router.push('/customer/borrowingsInProgress')}
            >
              Gerenciar seus empréstimos
            </button>

            <button 
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/borrowing/list')}
            >
              Novo Empréstimo
            </button>
          </>
        )}

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
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
