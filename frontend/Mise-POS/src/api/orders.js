const BASE_URL = "/api/orders";

export async function createOrder(tableId) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableId })
    }); 

    if (!res.ok) {
      throw new Error("Failed to create order");
    } 
    return res.json();
    } catch (error) {
    throw new Error(error.message || "Failed to create order");
    }
}

export async function getActiveOrder(tableId) {
    try { 
        const res = await fetch(`${BASE_URL}/active/${tableId}`);

        if (!res.ok) {
            throw new Error("Failed to fetch active order");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to fetch active order");
    }
}

export async function addItemToOrder(orderId, menuItemId, quantity = 1) {
    try {
        const res = await fetch(`${BASE_URL}/${orderId}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ menuItemId, quantity })
        });
        if (!res.ok) {
            throw new Error("Failed to add item to order");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to add item to order");
    }
}

export async function updateOrderItem(orderItemId, quantity) {
    try {
        const res = await fetch(`${BASE_URL}/items/${orderItemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity })
        });
        if (!res.ok) {
            throw new Error("Failed to update order item");
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to update order item");
    }   
}

export async function deleteOrderItem(orderItemId) {
    try {
        const res = await fetch(`${BASE_URL}/items/${orderItemId}`, {
            method: "DELETE"
        }); 
        if (!res.ok) {
            throw new Error("Failed to delete order item");
        }   
        return res.json();
    } catch (error) {
        throw new Error(error.message || "Failed to delete order item");
    }       

}


