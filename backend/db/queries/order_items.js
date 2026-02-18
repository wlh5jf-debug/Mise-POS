import db from "#db/client";

export async function addItemToOrder(orderId, menuItemId, quantity = 1, price){
const sql = `
INSERT INTO order_items (order_id, menu_item_id, quantity, price)
VALUES ($1, $2, $3, $4)
RETURNING id, order_id, menu_item_id, quantity, price,
  (SELECT name FROM menu_items WHERE id = menu_item_id) AS menu_item_name;`;

const { rows: [item] } = await db.query(sql, [orderId, menuItemId, quantity, price]);
return item;
}

export async function getOrderItems(orderId) {
    const sql =`
    SELECT
     order_item.id,
     order_item.menu_item_id,
     menu_item.name AS menu_item_name,
     order_item.quantity,
     order_item.price
    FROM order_items AS order_item
    JOIN menu_items AS menu_item
      ON menu_item.id = order_item.menu_item_id
    WHERE order_item.order_id = $1
    ORDER BY order_item.id;`;

    const { rows } = await db.query(sql, [orderId]);
    return rows;
}

export async function updateOrderItemQuantity(orderItemId, quantity) {
    const sql = `
    UPDATE order_items
    SET quantity = $2
    WHERE id = $1
    RETURNING id, order_id, menu_item_id, quantity, price;`;

    const { rows: [item] } = await db.query(sql, [orderItemId, quantity]);
    return item;
}

export async function removeOrderItem(orderItemId) {
    const sql = `
    DELETE FROM order_items
    WHERE id = $1
    RETURNING id, order_id, menu_item_id;`;

    const { rows: [item] } = await db.query(sql, [orderItemId]);
    return item;
}