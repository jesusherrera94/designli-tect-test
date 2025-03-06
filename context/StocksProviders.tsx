import { createContext, ReactNode, useState } from 'react';


const StocksContext = createContext<any>(undefined);

interface StocksProviderProps {
  children: ReactNode;
}

export function StocksProvider({ children }: StocksProviderProps ) {

    const [stocks, setStocks] = useState<any>({});

  return (
    <StocksContext.Provider value={
        {
            stocks,
            setStocks
        }
    }>
      {children}
    </StocksContext.Provider>
  );
}

export { StocksContext };