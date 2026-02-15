export default function MenuItemCard({ item, onAdd }) {
    const handleAdd = () => {
        if (onAdd) onAdd(item);
    };

    return (
        <button className="menu-item-card" onClick={handleAdd}>
            <div>{item.name}</div>
            <div>${(item.price / 100)}</div>
        </button>
    );
}