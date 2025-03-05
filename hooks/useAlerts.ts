import { useContext } from "react";
import { AlertsContext } from "../context/AlertsProviders";

export function useAlerts() {
    const context = useContext(AlertsContext);
    
    if (context === undefined) {
        throw new Error("useAlerts must be used within a AlertsProvider");
    }
    
    return context;
};