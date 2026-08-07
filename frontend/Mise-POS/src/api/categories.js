

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BASE_URL = `${API_URL}/categories`;


export async function getCategories() {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to fetch categories");
  }
}


export async function getCategoryById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to fetch category");
  }
}


export async function createCategory(name, token) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (!res.ok) {
      throw new Error("Failed to create category");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to create category");
  }
}

export async function deleteCategory(id, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error("Failed to delete category");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Failed to delete category");
  }
}
