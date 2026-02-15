import OrderItemRow from "./OrderItemRow";
import OrderTotal from "./OrderTotal";

export default function OrderPanel({ items = [], total = 0 }) {
    return (
        <div className="order-panel">
            {items.map((item) => (
                <OrderItemRow key={item.id} item={item} />
            ))}
            <OrderTotal total={total} />
        </div>
    );
}