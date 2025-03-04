import { useContext } from 'react';
import { FinhubConfigsContext } from '../context/FinhubProvider';

export function useFinhubConfigs() {
  const context = useContext(FinhubConfigsContext);
  if (context === undefined) {
    throw new Error('useFinhubConfigs must be used within a FinhubConfigsProvider');
  }
  return context;
}