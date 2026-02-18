import { useState, useEffect } from "react";
import { addPayment, getPaymentsByOrder as fetchPaymentsByOrder } from "../api/payments";

export function usePayment(orderId, orderTotal) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


useEffect(() => {
    if (!orderId) return;

    async function loadPayments() {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchPaymentsByOrder(orderId);
            setPayments(data);
        } catch (error) {
            setError(error.message || "Failed to load payments" );
        } finally {
            setLoading(false);
        }
    }

    loadPayments();

}, [orderId]);

async function submitPayment(amount) {
    if (!orderId) return;

    if (!amount || amount <= 0) {
        setError("Payment amount must be greater than 0");
        return;
    }

    try {
        const payment = await addPayment(orderId, amount);
        setPayments(prev => [...prev, payment]);
    } catch (error) {
        setError(error.message || "Failed to submit payment");
    } finally {
        setLoading(false);
    }

}

const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
const remainingBalance = orderTotal - totalPaid;

return {
    payments,
    totalPaid,
    remainingBalance,
    loading,
    error,
    submitPayment
};

}