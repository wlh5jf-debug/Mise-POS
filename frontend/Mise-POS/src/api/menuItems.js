const BASE_URL = "/api/menu-items";


export async function getMenuItems(categoryId) {
  const url = categoryId
    ? `${BASE_URL}?categoryId=${categoryId}`
    : BASE_URL;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch menu items");
    }
    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to fetch menu items");
  }
}


export async function getMenuItemById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch menu item");
    }
    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to fetch menu item");
  }
}


export async function createMenuItem({ name, price, categoryId }) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, categoryId })
    });

    if (!res.ok) {
      throw new Error("Failed to create menu item");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to create menu item");
  }
}


export async function updateMenuItem(id, { name, price, categoryId }) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, categoryId })
    });

    if (!res.ok) {
      throw new Error("Failed to update menu item");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to update menu item");
  }
}


export async function deleteMenuItem(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Failed to delete menu item");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to delete menu item");
  }
}