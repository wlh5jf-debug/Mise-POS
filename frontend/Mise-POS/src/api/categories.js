

const BASE_URL = "/api/categories";


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


export async function createCategory(name) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
