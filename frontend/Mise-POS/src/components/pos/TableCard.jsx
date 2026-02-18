export default function TableCard({ table, onSelect, activeTableId, serverName }) {
    const isActive = table.id === activeTableId;
    const isOccupied = serverName !== null;

    return (
        <button
            className={`table-card ${isActive ? "active" : ""} ${isOccupied ? "occupied" : ""}`}
            onClick={() => onSelect && onSelect(table.id)}
        >
            <div>Table {table.table_number}</div>
            <div>{table.capacity} seats</div>
            {isOccupied && <div className="table-card-server">{serverName}</div>}
        </button>
    );
}