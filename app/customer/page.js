"use client";

import RegisterCustomer from "./create/page";

const CadastrarCustomer = () => {
  return (
    <div className="container mx-auto mt-10 p-6 text-center ">
      <h1 className="text-4xl font-bold mb-4">Página do Cliente!</h1>
      <div className="flex justify-center space-x-4">
       
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Novo Empréstimo
          </button>
       
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Gerenciar seus empréstimos
          </button>
       
       
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Suas Estatísticas
          </button>
      
      </div>
    </div>
  );
};

export default CadastrarCustomer;
