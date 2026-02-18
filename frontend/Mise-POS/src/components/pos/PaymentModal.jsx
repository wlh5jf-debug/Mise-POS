import { useState } from "react";
import { usePayment } from "../../hooks/usePayment";

export default function PaymentModal({ orderId, orderTotal = 0, onClose, onSuccess }) {
    const { payments, remainingBalance, loading, error, submitPayment } = usePayment(orderId, orderTotal);
    const [amount, setAmount] = useState("");
    const [localError, setLocalError] = useState(null);

    const handlePayment = async () => {
        const numeric = Number(amount);
        if (!numeric || numeric <= 0) {
            setLocalError("Amount must be greater than 0");
            return;
        }

        try {
            await submitPayment(numeric);
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            setLocalError(error.message || "Failed to process payment");
        }
    };

    return (
        <div className="payment-modal-backdrop">
            <div className="payment-modal">
                <div className="payment-modal-header">
                    <h2>Payment</h2>
                    <button className="payment-modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="payment-modal-summary">
                    <span>Amount owed</span>
                    <span className="payment-modal-total">${(orderTotal / 100).toFixed(2)}</span>
                </div>

                <label className="payment-modal-label">
                    Enter amount
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
                        <strong>Payments applied</strong>
                        <ul>
                            {payments.map((p) => (
                                <li key={p.id}>${(p.amount / 100).toFixed(2)}</li>
                            ))}
                        </ul>
                        <div className="payment-modal-remaining">
                            Remaining: <span>${(remainingBalance / 100).toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}