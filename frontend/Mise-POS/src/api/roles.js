const BASE_URL = "/api/roles";

export async function getRoles() {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
            throw new Error("Failed to fetch roles");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to fetch roles");
    }
}
