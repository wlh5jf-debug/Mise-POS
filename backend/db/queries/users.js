import bcrypt from "bcrypt";
import db from "#db/client";

export async function createUser(name, roleId, pin) {
    const sql = `
    INSERT INTO users
    (name, role_id, pin_hash)
    VALUES
    ($1, $2, $3)
    RETURNING id, name, role_id;`;
    const pinHash = await bcrypt.hash(pin, 10);
    const {
        rows: [user],
    } = await db.query(sql, [name, roleId,pinHash]);
    return user;
};

export async function getUserByNameAndPin(name, pin) {
    const sql = `
    SELECT id, name, role_id, pin_hash
    FROM users
    WHERE name = $1 AND active = TRUE
    `;
    const { rows: [user] } = await db.query(sql, [name]);
    if (!user) return null;

    const isValid = await bcrypt.compare(pin, user.pin_hash);
    if (!isValid) return null;

    delete user.pin_hash;
    return user
};

export async function getUserById(id) {
    const sql = `
    SELECT id, name, role_id
    FROM users
    WHERE id = $1`;
    const { rows: [user] } = await db.query(sql, [id]
    );
    return user;
}

export async function getActiveUsers() {
    const sql = `
    SELECT id, name, role_id
    FROM users
    WHERE active = TRUE
    ORDER BY name`;
    const { rows } = await db.query(sql);
    return rows;
}

export async function deactivateUser(id) {
    const sql = `
    UPDATE users
    SET active = FALSE
    WHERE id = $1
    RETURNING id, name`;
    const { rows: [user] } = await db.query(sql, [id]);
    return user;
}
