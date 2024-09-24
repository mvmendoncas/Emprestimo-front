// src/components/Header/Header.js
"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setStorageItem } from "../../utils/localStorage";
import api from "../../api/http-common";
import {usePathname, useRouter} from "next/navigation";
import { showLogin } from "../redux/ui/uiSlice";
import { clearUserLogin } from "../redux/userLogin/userLoginSlice";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const router = useRouter();

  console.log('Is Authenticated:', isAuthenticated); // Log para depuração

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

  if (pathName === "/" || pathName === "/newuser" || pathName === "/agiota/create") {
    return null
  }

  return (
    <header className="bg-blue-800 text-white p-4">
      <div className={styles.Header}>
        <Link href="/">
          <h1 className="text-2xl">Agiota</h1>
        </Link>

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
