const BASE_URL = "/api/payments";

export async function addPayment(orderId, amount) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, amount })
        });
        if (!res.ok) {
            throw new Error("Failed to add payment");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to add payment");
    }
};

export async function getPaymentsByOrder(orderId) {
    try {
        const res = await fetch(`${BASE_URL}/order/${orderId}`);
        if (!res.ok) {
            throw new Error("Failed to fetch payments");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to fetch payments");
    }   
};