import { useState } from "react";
import { usePayment } from "../../hooks/usePayment";

const PAYMENT_METHODS = [
    { id: "cash", label: "Cash" },
    { id: "card", label: "Card" },
    { id: "gift_card", label: "Gift Card" },
];

export default function PaymentModal({ orderId, orderTotal = 0, onClose, onSuccess }) {
    const { payments, remainingBalance, loading, error, submitPayment } = usePayment(orderId, orderTotal);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [amount, setAmount] = useState("");
    const [localError, setLocalError] = useState(null);

    const displayTotal = (orderTotal / 100).toFixed(2);
    const displayRemaining = (remainingBalance / 100).toFixed(2);

    const handlePayment = async () => {
        const numeric = Number(amount);
        if (!numeric || numeric <= 0) {
            setLocalError("Amount must be greater than 0");
            return;
        }

        setLocalError(null);
        try {
            await submitPayment(numeric, paymentMethod);
            if (remainingBalance - numeric <= 0) {
                if (onSuccess) onSuccess();
                onClose();
            }
        } catch (err) {
            setLocalError(err.message || "Failed to process payment");
        }
    };

    return (
        <div className="payment-modal-backdrop">
            <div className="payment-modal">
                <div className="payment-modal-header">
                    <h2>Checkout</h2>
                    <button className="payment-modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="payment-modal-summary">
                    <span>Order Total</span>
                    <span className="payment-modal-total">${displayTotal}</span>
                </div>

                {payments.length > 0 && (
                    <div className="payment-modal-remaining-row">
                        <span>Remaining</span>
                        <span className="payment-modal-remaining-amount">${displayRemaining}</span>
                    </div>
                )}

                <div className="payment-method-label">Payment Method</div>
                <div className="payment-method-buttons">
                    {PAYMENT_METHODS.map((method) => (
                        <button
                            key={method.id}
                            className={`payment-method-btn${paymentMethod === method.id ? " active" : ""}`}
                            onClick={() => setPaymentMethod(method.id)}
                        >
                            {method.label}
                        </button>
                    ))}
                </div>

                <label className="payment-modal-label">
                    Amount Tendered
                    <input
                        className="payment-modal-input"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                    />
                </label>

                {(error || localError) && <p className="error">{error || localError}</p>}

                <button className="payment-modal-submit" onClick={handlePayment} disabled={loading}>
                    {loading ? "Processing..." : "Submit Payment"}
                </button>

                {payments.length > 0 && (
                    <div className="payment-modal-history">
                        <strong>Payments Applied</strong>
                        <ul>
                            {payments.map((p) => (
                                <li key={p.id}>
                                    <span>{p.payment_method === "gift_card" ? "Gift Card" : p.payment_method === "card" ? "Card" : "Cash"}</span>
                                    <span>${(p.amount / 100).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
