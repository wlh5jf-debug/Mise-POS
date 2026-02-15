export default function OrderItemRow({ item }) {
    return (
        <div className="order-item-row">
            <span>{item.menu_item_name}</span>
            <span>x{item.quantity}</span>
            <span>${(item.price * item.quantity) / 100}</span>
        </div>
    )
}