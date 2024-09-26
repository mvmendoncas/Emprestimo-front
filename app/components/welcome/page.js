"use client";

import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Seja Bem-vindo!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Bem-vindo(a) ao nosso sistema! Para continuar, faça o login com o e-mail e a senha que você cadastrou.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all duration-300"
          onClick={() => router.push('/')}
        >
          Fazer Login!
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
