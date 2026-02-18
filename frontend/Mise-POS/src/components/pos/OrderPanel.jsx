import OrderItemRow from "./OrderItemRow";
import OrderTotal from "./OrderTotal";

export default function OrderPanel({ items = [], onCheckout, onClear }) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="order-panel">
            <div className="order-items">
                {items.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                ))}
            </div>
            <OrderTotal total={total} />
            <div className="order-actions">
                <button className="order-btn-clear" onClick={onClear}>Clear Order</button>
                <button className="order-btn-checkout" onClick={onCheckout}>Checkout</button>
            </div>
        </div>
    );
}