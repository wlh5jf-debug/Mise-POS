import express from "express";
import {
    createUser,
    getUserById,
    getUserByNameAndPin,
    getActiveUsers,
    deactivateUser
} from "../queries/users.js";


const router = express.Router();

router.post("/", async (req, res) => { try{
    const { name, roleId, pin } = req.body;
    if (!name || !roleId || !pin) {
        return res.status(400).json({ Error: "Name, roleId, and pin required"});
    }
    const user = await createUser(name, roleId, pin);
    res.status(201).json(user);
} catch (error) {
    console.error(error);
    res.status(500).json({error: error.message})
}

});

router.get("/", async (req, res) => {
    try {
        const users = await getActiveUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req,res) => {
    try {
        const {name, pin} = req.body;
        const user = await getUserByNameAndPin(name, pin);
        if (!user) return res.status(401).json({ error: "Invalid name or PIN" });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

router.patch("/:id/deactivate", async(req, res) => 
{
    try{
        const user = await deactivateUser(req.params.id);
        if (!user) return res.status(404).json({error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message });
    }
})

export default router;