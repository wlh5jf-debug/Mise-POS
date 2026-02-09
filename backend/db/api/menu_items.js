import express from "express";
import {
    createMenuItem,
    getMenuItems,
    getAvailableMenuItems,
    getMenuItemsByCategory,
    getMenuItemById,
    setMenuItemAvailability
} from "../db/queries/menu_items.js";
export default router;

const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const items = await getMenuItems();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch menu items"})
    }
});

router.get("/available", async (req, res) => {
    try {
        const items = await getAvailableMenuItems();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch available menu items." })    
    }
});

router.get("/category/:categoryId", async (req, res) => {
    try {
        const items = await getMenuItemsByCategory(req.params.categoryId);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch menu items; Category"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const item = await getMenuItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found"})
        }
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch menu item" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, categoryId, price} = req.body;

        if (!name || !categoryId || !price) {
            return res.status(400).json({
                error: "name, categoryId, and price are required"
            });
        }
        const item = await createMenuItem(name, categoryId, price);
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create item"})
    }
});

router.patch("/:id/availability", async (req, res) => {
    try {
        const { available } = req.body;
        if (typeof available !== "boolean") {
            res.status(400).json({ error: "Availability must be a boolean" })
        }

        const item = await setMenuItemAvailability(req.params.id, available);
        if (!item) {
            return res.status(404).json({ error: "Menu item not found" });
        }

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update availability" });
    }
})