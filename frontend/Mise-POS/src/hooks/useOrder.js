import { useState, useEffect } from "react";
import {
  fetchOpenOrderByTable,
  createOrder,
  closeOrder
} from "../api/orders";

import {
  fetchOrderItems,
  addItemToOrder,
  updateOrderItem,
  deleteOrderItem
} from "../api/orderItems";

export function useOrder(tableId, serverId) {
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!tableId || !serverId) return;

    async function loadOrder() {
      setLoading(true);
      setError(null);

      try {
        let openOrder = await fetchOpenOrderByTable(tableId);

        if (!openOrder) {
          openOrder = await createOrder(tableId, serverId);
        }

        setOrder(openOrder);

        const orderItems = await fetchOrderItems(openOrder.id);
        setItems(orderItems);
      } catch (err) {
        setError(err.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [tableId, serverId]);

  
  async function addItem(menuItem) {
    if (!order) return;

    try {
      const existing = items.find(
        (item) => item.menu_item_id === menuItem.id
      );

      if (existing) {
        const updated = await updateOrderItem(
          existing.id,
          existing.quantity + 1
        );

        setItems((prev) =>
          prev.map((item) =>
            item.id === existing.id ? updated : item
          )
        );
      } else {
        const newItem = await addItemToOrder(
          order.id,
          menuItem.id,
          1,
          menuItem.price
        );

        setItems((prev) => [...prev, newItem]);
      }
    } catch (error) {
      setError(error.message || "Failed to add item");
    }
  }

  
  async function updateQuantity(orderItemId, quantity) {
    if (!order) return;

    try {
      const updated = await updateOrderItem(orderItemId, quantity);

      setItems((prev) =>
        prev.map((item) =>
          item.id === orderItemId ? updated : item
        )
      );
    } catch (error) {
      setError(error.message || "Failed to update quantity");
    }
  }

  // Remove item
  async function removeItem(orderItemId) {
    if (!order) return;

    try {
      await deleteOrderItem(orderItemId);

      setItems((prev) =>
        prev.filter((item) => item.id !== orderItemId)
      );
    } catch (error) {
      setError(error.message || "Failed to remove item");
    }
  }

  
  async function finalizeOrder() {
    if (!order) return;

    try {
      await closeOrder(order.id);
      setOrder(null);
      setItems([]);
    } catch (error) {
      setError(error.message || "Failed to close order");
    }
  }

  
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    order,
    items,
    total,
    loading,
    error,
    addItem,
    updateQuantity,
    removeItem,
    finalizeOrder
  };
}