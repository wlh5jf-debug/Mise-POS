import express from "express";
import { getRoles, createRole} from "../db/queries/roles.js";
export default router;

const router = express.Router();

router.get("/", async (req, res) =>
{
    try{
        const roles = await getRoles();
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load roles" });
    }
})

router.post("/", async (req,res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Role name is required."});
        }
        const role = await createRole(name);
        res.status(201).json(role);
    } catch (error) {
        console.error(error);

if (error.code === "23505") {
    return res.status(409).json({error: "Role already exists"});
    }

   

    res.status(500).json({ error: "Failed to create role."})
}
});

