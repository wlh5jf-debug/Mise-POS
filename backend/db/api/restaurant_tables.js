import express from "express";
import {
    createTable,
    getTables,
    getTableById
} from "../db/queries/restaurant_tables.js";
export default router;

const router = express.Router();
 

router.get("/", async (req, res) => {
    try{
        const tables = await getTables();
        res.json(tables);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:"Failed to fetch tables." });
    }
});

router.get("/:id", async (req, res) => {
    try{
        const table = await getTableById(req.params.id);
        if (!table) {
            return res.status(404).json({ error: "Table not found" });
        }
        res.json(table);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch table" });
    }
});

router.post("/", async (req, res) =>
{
    try {
      const { table_number, capacity} = req.body;

      if (!table_number || !capacity) {
        return res.status(400).json({ error: "table_number and capacity are required" });
      }

     const table = await createTable(table_number, capacity);
     res.status(201).json(table);
    } catch (error) {
        console.error(error);

    res.status(500).json({ error: "Failed to create table" });
    }
}
);

