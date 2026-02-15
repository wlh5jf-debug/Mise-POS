export default function TableCard({ table, onSelect, activeTableId }) {
    const isActive = table.id === activeTableId;

    return (
        <button
            className={`table-card ${isActive ? "active" : ""}`}
            onClick={() => onSelect && onSelect(table.id)}
        >
            <div>Table {table.table_number}</div>
            <div> Seats {table.capacity}</div>
        </button>
    );
}