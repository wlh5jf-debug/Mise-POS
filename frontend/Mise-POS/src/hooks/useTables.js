import { useState, useEffect } from "react";
import { getTables } from "../api/tables";

export function useTables() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadTables() {
        setLoading(true);
        setError(null);

        try {
            const data = await getTables();
            setTables(data);
        } catch (error) {
            setError(error.message || "Failed to load tables");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTables();
    }, []);

    return {
        tables,
        loading,
        error,
        refreshTables: loadTables
    }
}