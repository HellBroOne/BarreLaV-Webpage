import { createContext, useContext, useEffect, useState } from "react";
import { obtenerClases } from "../service/api";

const ClasesContext = createContext();

export function ClasesProvider({ children }) {
    const [clases, setClases] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    async function cargarClases() {
        try {
            setError(null);

            const data = await obtenerClases();

            setClases(data);
        } catch (error) {
            console.error("Error al cargar clases:", error);
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarClases();
    }, []);

    return (
        <ClasesContext.Provider
            value={{
                clases,
                cargando,
                error,
                recargarClases: cargarClases,
            }}
        >
            {children}
        </ClasesContext.Provider>
    );
}

export function useClases() {
    return useContext(ClasesContext);
}
