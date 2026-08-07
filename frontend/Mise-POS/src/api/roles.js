const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BASE_URL = `${API_URL}/roles`;
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
