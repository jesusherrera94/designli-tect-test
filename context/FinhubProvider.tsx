import { createContext, ReactNode } from 'react';
import configs from '../finhub-config';
import { FinhubConfigs } from '../interfaces/FinhubConfigs';


const FinhubConfigsContext = createContext<FinhubConfigs | undefined>(undefined);

interface FinhubConfigsProviderProps {
  children: ReactNode;
}

export function FinhubConfigsProvider({ children }: FinhubConfigsProviderProps) {
  return (
    <FinhubConfigsContext.Provider value={configs}>
      {children}
    </FinhubConfigsContext.Provider>
  );
}

export { FinhubConfigsContext };