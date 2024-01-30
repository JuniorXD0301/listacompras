// src/AppContext.js Este archivo contendrá el Context de la aplicación.
import { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <AppContext.Provider value={{ cart, setCart, products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
