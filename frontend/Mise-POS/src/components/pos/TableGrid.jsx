import { useState } from "react";
import TableCard from "./TableCard";
import { useTables } from "../../hooks/useTables";

export default function TableGrid({ onTableSelect }) {
    const { tables, loading, error } = useTables();
    const [activeTableId, setActiveTableId] = useState(null);

    const handleSelect = (id) => {
        setActiveTableId(id);
        if (onTableSelect) onTableSelect(id);
    };

    if (loading) return <p>Loading tables...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="table-grid">
            {tables.map((table) => (
                <TableCard
                    key={table.id}
                    table={table}
                    onSelect={handleSelect}
                    activeTableId={activeTableId}
                />
            ))}
        </div>
    );
}