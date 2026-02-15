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
        <div className="payment-modal">
            <h2>Payment</h2>
            <div>
                <label>
                    Amount owed: ${(orderTotal / 100)}
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                    />
                </label>
            </div>
            {(error || localError) && <p className="error">{error || localError}</p>}
            <button onClick={handlePayment} disabled={loading}>
                Submit Payment
            </button>
            <button onClick={onClose}>Close</button>
            <div>
                <strong>Payments:</strong>
                <ul>
                    {payments.map((p) => (
                        <li key={p.id}>${(p.amount / 100)}</li>
                    ))}
                </ul>
                <div>Remaining: ${(remainingBalance / 100)}</div>
            </div>
        </div>
    );
}