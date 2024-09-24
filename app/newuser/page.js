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
    <div className="container mx-auto mt-10 p-6 text-center ">
        <Link href="/">
            voltar para o login
        </Link>
      <h1 className="text-4xl font-bold mb-4">Seja Bem-vindo!</h1>
      <p className="text-lg mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
      </p>
      <div className="flex justify-center space-x-4">
        <Link href="/agiota/create">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Quero ser Agiota
          </button>
        </Link>
        <Link href="/customer/create">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Quero ser Cliente
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
