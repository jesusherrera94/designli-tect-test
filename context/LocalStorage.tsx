import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface LocalStorageContextProps {
  getItem: (key: string) => any | null;
  setItem: (key: string, value: any) => void;
  removeItem: (key: string) => void;
}

const LocalStorageContext = createContext<LocalStorageContextProps | undefined>(undefined);

interface LocalStorageProviderProps {
  children: ReactNode;
}

export const LocalStorageProvider = ({ children }: LocalStorageProviderProps) => {
  
  const getItem = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.error('Error getting data:', e);
        return null;
      }
  };

  const setItem = async (key: string, value: any) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  };

  const removeItem = async (key: string) => {
    await AsyncStorage.removeItem(key);
  };

  return (
    <LocalStorageContext.Provider value={{ getItem, setItem, removeItem }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export { LocalStorageContext };