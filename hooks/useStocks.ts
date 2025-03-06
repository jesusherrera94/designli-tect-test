import { useContext } from 'react';
import { StocksContext } from '@/context/StocksProviders';

export function useStocks() {
  const context = useContext(StocksContext);
  if (context === undefined) {
    throw new Error('useStocks must be used within a UseStocksProvider');
  }
  return context;
}