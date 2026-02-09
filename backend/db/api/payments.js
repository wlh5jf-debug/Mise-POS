import express from "express";
import {
    addPayment,
    getPaymentsByOrder
} from "../db/queries/payments.js";

export default router;

const router = express.Router();

router.get("/order/:orderId", async (req, res) => {
    try {
        const payments = await getPaymentsByOrder(req.params.orderId);
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch payments "});
    }
});

router.post("/", async (req, res) => {
    try {
        const { orderId, amount } = req.body;

        if (!orderId || amount == null || amount <= 0) {
            return res.status(400).json({
                error: "orderId and positive amount are required"
            });
        }
        const payment = await createPayment(orderId, amount);
        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add payment"});
    }

});