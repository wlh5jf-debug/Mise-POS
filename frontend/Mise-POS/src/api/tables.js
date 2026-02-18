const BASE_URL = "/api/tables";

export async function getTables() {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch tables");
    }   
    return res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch tables");
  } 
}

export async function getTableById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch table");
    }
    return res.json();
    } catch (error) {
      throw new Error(error.message || "Failed to fetch table");
    }
}

export async function createTable(table_number, capacity, token) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ table_number, capacity })
        });
        if (!res.ok) {
            throw new Error("Failed to create table");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to create table");
    }
}

export async function updateTable(id, { table_number, capacity }) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {                  
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ table_number, capacity })
        }); 
        if (!res.ok) {
            throw new Error("Failed to update table");
        }   
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to update table");
    }
}

export async function deleteTable(id, token) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) {
            throw new Error("Failed to delete table");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to delete table");
    }
}


