import { useState, useEffect } from "react";
import TableCard from "./TableCard";
import { useTables } from "../../hooks/useTables";
import { useAuth } from "../../context/AuthContext";
import { createTable } from "../../api/tables";
import { getOpenOrders } from "../../api/orders";

export default function TableGrid({ onSelectTable }) {
    const { tables, loading, error, refreshTables } = useTables();
    const { user } = useAuth();
    const [activeTableId, setActiveTableId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newTable, setNewTable] = useState({ table_number: "", capacity: "" });
    const [formError, setFormError] = useState(null);
    const [openOrders, setOpenOrders] = useState([]);

    useEffect(() => {
        async function loadOpenOrders() {
            try {
                const orders = await getOpenOrders();
                setOpenOrders(orders);
            } catch {
                // non-critical, fail silently
            }
        }
        loadOpenOrders();
    }, []);

    const handleSelect = (id) => {
        setActiveTableId(id);
        if (onSelectTable) onSelectTable(id);
    };

    async function handleCreate(e) {
        e.preventDefault();
        setFormError(null);
        try {
            await createTable(parseInt(newTable.table_number), parseInt(newTable.capacity), user.token);
            setNewTable({ table_number: "", capacity: "" });
            setShowForm(false);
            refreshTables();
        } catch {
            setFormError("Failed to create table");
        }
    }

    if (loading) return <p>Loading tables...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="table-grid-wrapper">
            <div className="table-grid-toolbar">
                <button className="table-add-btn" onClick={() => setShowForm((v) => !v)}>
                    {showForm ? "Cancel" : "+ Add Table"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleCreate} className="table-add-form">
                    <input
                        type="number"
                        placeholder="Table #"
                        min="1"
                        value={newTable.table_number}
                        onChange={(e) => setNewTable({ ...newTable, table_number: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Seats"
                        min="1"
                        value={newTable.capacity}
                        onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                        required
                    />
                    <button type="submit">Save</button>
                    {formError && <p className="error">{formError}</p>}
                </form>
            )}

            <div className="table-grid">
                {tables.map((table) => {
                    const order = openOrders.find((o) => o.table_id === table.id);
                    return (
                        <TableCard
                            key={table.id}
                            table={table}
                            onSelect={handleSelect}
                            activeTableId={activeTableId}
                            serverName={order?.server_name ?? null}
                        />
                    );
                })}
            </div>
        </div>
    );
}