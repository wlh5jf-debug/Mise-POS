import express from "express";
import {
    getCategories,
    createCategory,
    getCategoryById
} from "../queries/categories.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch categories"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to find category" });
    }
});


router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Category must have a name" });
        }

        const category = await createCategory(name);
        res.status(201).json(category);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Failed to create a category" });
    }
})

export default router;
