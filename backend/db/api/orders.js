import express from "express";
import {
    createOrder,
    getOrderById,
    getOpenOrderByTable,
    closeOrder
} from "../db/queries/orders.js";
export default router;

const router = express.Router();

router.post("/", async (req,res) => {
    try {
        const { tableId, serverId } = req.body;

        if (!tableId || serverId ) {
            return res.status(400).json({ error: "tableId and serverId required" });
        }

        const order = await createOrder(tableId, serverId);

        if (!order) {
            return res.status(409).json ({
                error: "Table already has an open order"
            });
        }

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" })
    }
    });

    router.get("/:id", async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch order" });
    }
    });

    router.get("/table/:tableId/open", async (req, res) => {
        try {
            const order = await getOpenOrderByTable(req.params.tableId);

            if (!order) {
                return res.status(404).json({
                    error: "No open order for this table"
                });
            }
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch an open order" });
        }
    });

    router.patch("/:id/close", async (req, res) => {
        try{
            const order = await closeOrder(req.params.id);

            if (!order) {
                return res.status(409).json({
                    error: "Order is closed or does not exist"
                });
            }

            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to close order"})
        }
    });
