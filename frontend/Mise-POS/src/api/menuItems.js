const BASE_URL = "/api/menu-items";


export async function getMenuItems(categoryId) {
  const url = categoryId
    ? `${BASE_URL}/category/${categoryId}`
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


export async function createMenuItem({ name, price, categoryId }, token) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
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


export async function updateMenuItem(id, { name, price, categoryId }, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
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


export async function deleteMenuItem(id, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error("Failed to delete menu item");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to delete menu item");
  }
}

export async function setMenuItemAvailability(id, available, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/availability`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ available }),
    });

    if (!res.ok) {
      throw new Error("Failed to update availability");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to update availability");
  }
}