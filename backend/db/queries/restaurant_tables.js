import db from "#db/client";

export async function createTable(table_Number, capacity) {
    const sql = `
    INSERT INTO restaurant_tables(table_number, capacity)
    VALUES ($1, $2)
    RETURNING *`;

    const { rows: [table] } = await db.query(sql, [table_Number, capacity]);
    return table;

}

export async function getTables() {
    const sql = `
    SELECT id, table_number, capacity
    FROM restaurant_tables ORDER BY table_number`;

    const { rows } = await db.query(sql);
    return rows;
}

export async function getTableById(id){
    const sql = `
    SELECT id, table_number, capacity
    FROM restaurant_tables
    WHERE id = $1`;

    const { rows: [table] } = await db.query(sql, [id]);
    return table;
}

