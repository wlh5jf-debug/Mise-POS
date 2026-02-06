import db from "#db/client";

export async function addPayment(orderId, amount) {
    const sql= `
    INSERT INTO payments (order_id, amount)
    VALUES ($1, $2)
    RETURNING id, order_id, amount`;

    const { rows: [payment] } = await db.query(sql, [orderId, amount]);
    return payment;
}

export async function getPaymentsByOrder(orderId) {
    const sql = `
    SELECT id, order_id, amount
    FROM payments
    WHERE order_id = $1
    ORDER by id`;

    const { rows } = await db.query(sql, [orderId]);
    return rows;
}