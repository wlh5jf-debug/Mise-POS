export default function OrderTotal({ total = 0 }) {
    return (
        <div className="order-total">
            <strong>Total:</strong> ${((total || 0) / 100).toFixed(2)}
        </div>
    );
}