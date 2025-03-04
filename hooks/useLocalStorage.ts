import { useContext } from 'react';
import {LocalStorageContext } from '../context/LocalStorage';

export const useLocalStorage = () => {
    const context = useContext(LocalStorageContext);
    if (context === undefined) {
      throw new Error('useLocalStorage must be used within a LocalStorageProvider');
    }
    return context;
  };