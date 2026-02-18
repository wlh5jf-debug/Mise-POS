const BASE_URL = "/api/users";

export async function loginUser(name, pin) {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, pin })
        });
        if (!res.ok) {
            throw new Error("Invalid name or PIN");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Login failed");
    }
}

export async function getActiveUsers() {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
            throw new Error("Failed to fetch users");
                        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to fetch users");
    }                                                                                  
}

export async function getUserById(id) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`);
        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to fetch user");
    } 
};

export async function createUser({ name, roleId, pin }, token) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, roleId, pin })
        });
        if (!res.ok) {
            throw new Error("Failed to create user");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to create user");
    }
};

export async function updateUser(id, { name, roleId, pin }) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, roleId, pin })
        });
        if (!res.ok) {
            throw new Error("Failed to update user");
        }   
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to update user");
    }
};

export async function deleteUser(id) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            throw new Error("Failed to delete user");
        }               
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to delete user");
    }
};

export async function deactivateUser(id, token) {
    try {
        const res = await fetch(`${BASE_URL}/${id}/deactivate`, {
            method: "PATCH",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) {
            throw new Error("Failed to deactivate user");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to deactivate user");
    }
};


export async function activateUser(id) {
    try {
        const res = await fetch(`${BASE_URL}/${id}/activate`, {         
            method: "PATCH"
        });
        if (!res.ok) {
            throw new Error("Failed to activate user");
        }       
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to activate user");
    }   
};

