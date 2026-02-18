import express from "express";
import {
    createMenuItem,
    getMenuItems,
    getAvailableMenuItems,
    getMenuItemsByCategory,
    getMenuItemsById,
    updateMenuItem,
    deleteMenuItem,
    setMenuItemAvailability
} from "../queries/menu_items.js";
import requireRole from "../../middleware/requireRole.js";

const requireAdmin = requireRole(1);
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
        const item = await getMenuItemsById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found"})
        }
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch menu item" });
    }
});

router.post("/", requireAdmin, async (req, res) => {
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

router.put("/:id", requireAdmin, async (req, res) => {
    try {
        const { name, categoryId, price } = req.body;
        if (!name || !categoryId || !price) {
            return res.status(400).json({ error: "name, categoryId, and price are required" });
        }
        const item = await updateMenuItem(req.params.id, name, categoryId, price);
        if (!item) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update menu item" });
    }
});

router.delete("/:id", requireAdmin, async (req, res) => {
    try {
        const item = await deleteMenuItem(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        res.json({ message: "Deleted", id: item.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete menu item" });
    }
});

router.patch("/:id/availability", requireAdmin, async (req, res) => {
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

export default router;