// src/components/Providers.js
"use client";

import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './redux/store';
import { clearUserLogin, setUserLogin } from './redux/userLogin/userLoginSlice';

const Providers = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Recupera os dados do usuário armazenados no localStorage
      const username = localStorage.getItem('userlogin'); // Ajuste o nome da chave conforme o que você usa
      const roles = JSON.parse(localStorage.getItem('roles')); // Certifique-se de que as roles estão armazenadas como JSON
      const userId = localStorage.getItem('userId');

      if (username && roles) {
        store.dispatch(setUserLogin({ username, roles }));
      } else {
        store.dispatch(clearUserLogin()); // Assegura que o estado está limpo se faltar informação
      }
    } else {
      store.dispatch(clearUserLogin());
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default Providers;
