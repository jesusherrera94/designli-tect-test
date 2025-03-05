import { createContext, ReactNode, useState } from 'react';

interface AlertsProvider {
    alerts: { stock: string; price: number }[];
    addAlert: (alert: { stock: string; price: number }) => void;
    removeAlert: (alert: { stock: string; price: number }) => void;
};

interface AlertsProviderProps {
    children: ReactNode;
};

const AlertsContext = createContext<AlertsProvider | undefined>(undefined);

export function AlertsProvider({ children }: AlertsProviderProps) {

    const [alerts, setAlerts] = useState<{ stock: string; price: number }[]>([]);

    const addAlert = (alert: { stock: string; price: number }) => {
        setAlerts([...alerts, alert]);
    };

    const removeAlert = (alert: { stock: string; price: number }) => {
        setAlerts(alerts.filter((a) => a !== alert));
    };


  return (
    <AlertsContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertsContext.Provider>
  );
}

export { AlertsContext };