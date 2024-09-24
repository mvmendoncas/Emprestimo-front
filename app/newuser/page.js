// app/components/homepage/page.js
"use client"; // Necessário para usar hooks do React
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Login from '../components/Login/page'; // Ajustar o caminho conforme necessário
import style from './HomePage.module.css'
const HomePage = () => {
  const showLogin = useSelector((state) => state.ui.showLogin);

  if (showLogin) {
    return (
      <div className={style.loginContainer}>
        <Login />
      </div>
    );
  }

  return (
      <div className="container mx-auto mt-10 p-6 col-md-3">
          <h1 className={style.title}>A.G.I.O.T.A</h1>
          <p className="text-lg mb-6 mt-8 text-justify">
              <b>A.G.I.O.T.A</b> é a plataforma que conecta você com soluções rápidas e acessíveis de empréstimos.
              Precisa de dinheiro rápido? Nosso sistema permite que você solicite empréstimos de forma simples e segura,
              com condições personalizadas para atender às suas necessidades. Faça sua conta conosco!
          </p>
          <div className="flex flex-col items-center space-y-2 mb-3">
              <Link className={style.agiota__button} href="/agiota/create">
                  <button>
                      AGIOTA
                  </button>
              </Link>
              <Link className={style.customer__button} href="/customer/create">
                  <button>
                      CLIENTE
                  </button>
              </Link>
          </div>
          <div className={style.link__login}>
              <Link href="/">
                  Já tenho uma conta!
              </Link>
          </div>
      </div>
  );
};

export default HomePage;
