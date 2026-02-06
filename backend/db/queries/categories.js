import db from "#db/client";

export async function createCategory(name) {
    const sql = `
    INSERT INTO categories(name)
    VALUES($1)
    RETURNING *`;

    const { rows: [category] } = await db.query(sql, [name]);
    return category;
}

export async function getCategories() {
    const sql = `
    SELECT id, name
    FROM categories
    ORDER by name`;

    const { rows } = await db.query(sql);
    return rows;
}

export async function getCategoryById(id) {
    const sql = `
    SELECT id, name
    FROM categories
    WHERE id = $1`;

    const { rows: [category] } = await db.query(sql, [id]);
    return category;
}