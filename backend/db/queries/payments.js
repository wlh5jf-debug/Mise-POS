import db from "#db/client";

export async function addPayment(orderId, amount, paymentMethod) {
    const sql= `
    INSERT INTO payments (order_id, amount, payment_method)
    VALUES ($1, $2, $3)
    RETURNING id, order_id, amount, payment_method`;

    const { rows: [payment] } = await db.query(sql, [orderId, amount, paymentMethod]);
    return payment;
}

export async function getPaymentsByOrder(orderId) {
    const sql = `
    SELECT id, order_id, amount, payment_method
    FROM payments
    WHERE order_id = $1
    ORDER by id`;

    const { rows } = await db.query(sql, [orderId]);
    return rows;
}