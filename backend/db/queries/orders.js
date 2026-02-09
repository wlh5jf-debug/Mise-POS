import db from "#db/client";

export async function createOrder(tableId, serverId) {
    const sql = `
    INSERT INTO orders (table_id, server_id)
    SELECT $1, $2
    WHERE NOT EXISTS (
    SELECT 1
    FROM orders
    WHERE table_id =$1
    AND status = 'open')
    RETURNING id, table_id, server_id, status;`;

    const { rows: [order] } = await db.query(sql, [tableId, serverId]);
    return order;
}

export async function getOrderById(id) {
    const sql = `
    SELECT id, table_id, server_id, status
    FROM orders
    WHERE id = $1;`;

    const { rows: [order] } = await db.query(sql, [id]);
    return order;
}

export async function getOpenOrderByTable(tableId){
    const sql = `
    SELECT id, table_id, server_id, status
    FROM orders
    WHERE table_id = $1
    AND status = 'open;`;

    const { rows: [order] } = await db.query(sql, [tableId]);
    return order;
}

export async function closeOrder(orderId){
    const sql = `
    UPDATE orders
    SET status = 'closed'
    WHERE id = $1
    AND status = 'open'
    RETURNING id, status`;

    const { rows: [order] } = await db.query(sql, [orderId]);
    return order;
}