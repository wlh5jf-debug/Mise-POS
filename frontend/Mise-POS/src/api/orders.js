const BASE_URL = "/api/orders";

export async function createOrder(tableId, token) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ tableId }),
  });
  if (res.status === 409) {
    // Table already has an open order
    return { error: "Table already has an open order", conflict: true };
  }
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}
export async function getOrderItems(orderId) {
  const res = await fetch(`/api/order-items/${orderId}`);
  if (!res.ok) throw new Error("Failed to fetch order items");
  return res.json();
}

export async function addItemToOrder(orderId, menuItemId, quantity, price) {
  const res = await fetch("/api/order-items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, menuItemId, quantity, price }),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}

export async function updateOrderItemQuantity(orderItemId, quantity) {
  const res = await fetch(`${BASE_URL}/items/${orderItemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}

export async function getOpenOrders() {
  const res = await fetch(`${BASE_URL}/open`);
  if (!res.ok) throw new Error("Failed to fetch open orders");
  return res.json();
}

export async function getActiveOrder(tableId) {
  const res = await fetch(`/api/orders/active/${tableId}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch active order");
  return res.json();
}
export async function removeOrderItem(orderItemId) {
  const res = await fetch(`${BASE_URL}/items/${orderItemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}

export async function closeOrder(orderId) {
  const res = await fetch(`${BASE_URL}/${orderId}/close`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to close order");
  return res.json();
}