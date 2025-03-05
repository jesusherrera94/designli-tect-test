import { createContext, ReactNode } from 'react';
import configs from '../finhub-config';


const StocksContext = createContext<any>(undefined);

interface StocksProviderProps {
  children: ReactNode;
}

export function FinhubConfigsProvider({ children }: StocksProviderProps ) {
    
  return (
    <StocksContext.Provider value={configs}>
      {children}
    </StocksContext.Provider>
  );
}

export { StocksContext };