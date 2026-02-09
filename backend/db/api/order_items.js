import express from "express";
import {
    addItemToOrder,
    getOrderItems,
    updateOrderItemQuantity,
    removeOrderItem
} from "../db/queries/order_items.js";
export default router;

const router = express.Router();

router.get("/:orderId", async (req,res) => {
    try{
        const items = await getOrderItems(req.params.orderId);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch the orders items"})
    }
});

router.post("/", async (req, res) => {
    try {
        const { orderId, menuItemId, quantity = 1, price} = req.body;

        if (!orderId || !menuItemId || price == null) {
            return res.status(400).json({
                error: "orderId, menuItemId, and price are required"
            });
        }

        const item = await addItemToOrder(
            orderId,
            menuItemId,
            quantity,
            price
        );
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add an item to the order" });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity == null || quantity < 1) {
            return res.status(400).json({
                error: "Quantity must be at least 1"
            });
        }

        const item = await updateOrderItemQuantity(req.params.id, quantity);

        if (!item) {
            return res.status(404).json({ error: "Order item not found" });
        }
        
        res.json(item)
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update item quanity" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const item = await removeOrderItem(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Order item not found" })
        }

        res.json(item);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to remove item" });
    }
});