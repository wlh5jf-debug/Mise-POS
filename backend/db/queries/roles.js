import db from "#db/client";

export async function createRole(name) {
    const sql = `
    INSERT INTO roles (name)
    VALUES ($1)
    RETURNING *`;

    const { rows: [role] } = await db.query(sql, [name]);
    return role;
};

export async function getRoles() {
  const sql = `
    SELECT * FROM roles;
  `;

  const { rows } = await db.query(sql);
  return rows;
}