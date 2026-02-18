import express from "express";
import {
  createOrder,
  getOrderById,
  getOpenOrderByTable,
  getOpenOrders,
  closeOrder
} from "../queries/orders.js";
import { getOrderItems } from "../queries/order_items.js";
console.log("🔥 LOADED NEW ORDERS ROUTES");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { tableId } = req.body;

    if (!tableId) {
      return res.status(400).json({ error: "tableId is required" });
    }

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const order = await createOrder(tableId, req.user.id);

    if (!order) {
      return res.status(409).json({
        error: "Table already has an open order",
      });
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order failed:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});



 
router.get("/open", async (req, res) => {
  try {
    const orders = await getOpenOrders();
    res.json(orders);
  } catch (err) {
    console.error("Fetch open orders failed:", err);
    res.status(500).json({ error: "Failed to fetch open orders" });
  }
});

router.get("/active/:tableId", async (req, res) => {
  try {
    const order = await getOpenOrderByTable(req.params.tableId);

    if (!order) {
      return res.status(200).json(null);
    }

    res.json(order);
  } catch (err) {
    console.error("Fetch active order failed:", err);
    res.status(500).json({ error: "Failed to fetch active order" });
  }
});

/**
 * Get order items (must come before /:id)
 */
router.get("/:orderId/items", async (req, res, next) => {
  try {
    const items = await getOrderItems(req.params.orderId);
    res.json(items);
  } catch (err) {
    next(err);
  }
});

/**
 * Close an order
 */
router.patch("/:id/close", async (req, res) => {
  try {
    const order = await closeOrder(req.params.id);

    if (!order) {
      return res.status(409).json({
        error: "Order is already closed or does not exist"
      });
    }

    res.json(order);
  } catch (err) {
    console.error("Close order failed:", err);
    res.status(500).json({ error: "Failed to close order" });
  }
});

/**
 * Get order by ID (GENERIC — MUST BE LAST)
 */
router.get("/:id", async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Fetch order failed:", err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
