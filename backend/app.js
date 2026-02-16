import express from "express";
import cors from "cors";

import getUserFromToken from "./middleware/getUserFromToken.js";

import usersRouter from "./db/api/users.js";
import rolesRouter from "./db/api/roles.js";
import tablesRouter from "./db/api/restaurant_tables.js";
import categoriesRouter from "./db/api/categories.js";
import menuItemsRouter from "./db/api/menu_items.js";
import ordersRouter from "./db/api/orders.js";
import orderItemsRouter from "./db/api/order_items.js";
import paymentsRouter from "./db/api/payments.js";

const app = express();
export default app;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.use("/api/users", usersRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/tables", tablesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/menu-items", menuItemsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/order-items", orderItemsRouter);
app.use("/api/payments", paymentsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
