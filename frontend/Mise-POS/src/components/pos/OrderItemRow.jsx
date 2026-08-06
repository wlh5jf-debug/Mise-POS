export default function OrderItemRow({ item, onRemove }) {
    return (
        <div className="order-item-row">
            <span>{item.menu_item_name}</span>
            <span>x{item.quantity}</span>
            <span>${(item.price * item.quantity) / 100}</span>
            <button className="order-item-remove" onClick={onRemove}>x</button>
        </div>
    )
}