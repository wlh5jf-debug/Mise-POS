import db from "#db/client";

export async function createMenuItem(name, categoryId, price){
const sql = `
INSERT INTO menu_items(name, category_id, price)
VALUES ($1, $2, $3)
RETURNING id, name, category_id, price, available`;

const { rows: [item] } = await db.query(sql, [name,categoryId, price]);
return item;

}

export async function getMenuItems() {
    const sql = `
    SELECT id, name, category_id, price, available
    FROM menu_items
    ORDER by name`;

    const { rows } = await db.query(sql);
    return rows;
}

export async function getAvailableMenuItems(){
    const sql = `
    SELECT id, name, category_id, price
    FROM menu_items
    WHERE available = TRUE
    ORDER BY name`;

    const { rows } = await db.query(sql);
    return rows;
}

export async function getMenuItemsByCategory(categoryId){
    const sql = `
    SELECT id, name, price
    FROM menu_items
    WHERE category_id = $1
    AND available = TRUE
    ORDER BY name`;

    const { rows } = await db.query(sql, [categoryId]);
    return rows;
}

export async function getMenuItemsById(id) {
    const sql = `
    SELECT id, name, category_id, price, available
    FROM menu_items
    WHERE id = $1`;

    const { rows: [item] } = await db.query(sql, [id]);
    return item;
}

export async function updateMenuItem(id, name, categoryId, price) {
    const sql = `
    UPDATE menu_items
    SET name = $2, category_id = $3, price = $4
    WHERE id = $1
    RETURNING id, name, category_id, price, available;`;

    const { rows: [item] } = await db.query(sql, [id, name, categoryId, price]);
    return item;
}

export async function deleteMenuItem(id) {
    const sql = `
    DELETE FROM menu_items
    WHERE id = $1
    RETURNING id;`;

    const { rows: [item] } = await db.query(sql, [id]);
    return item;
}

export async function setMenuItemAvailability(id, available) {
    const sql = `
    UPDATE menu_items
    SET available = $2
    WHERE id = $1
    RETURNING id, name, available;`;

    const { rows: [item] } = await db.query(sql, [id, available]);
    return item;
}