import express from "express";
const app = express();
import cors from "cors";
export default app;

import getUserFromToken from "./middleware/getUserFromToken.js";

import usersRouter from "./api/users.js";
import rolesRouter from "./api/roles.js";
import tablesRouter from "./api/restaurant_tables.js";
import categoriesRouter from "./api/categories.js";
import menuItemsRouter from "./api/menu_items.js";
import ordersRouter from "./api/orders.js";
import orderItemsRouter from "./api/order_items.js";
import paymentsRouter from "./api/payments.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(getUserFromToken);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/tables", tablesRouter);
app.use("/categories", categoriesRouter);
app.use("/menu-items", menuItemsRouter);
app.use("/orders", ordersRouter);
app.use("/order-items", orderItemsRouter);
app.use("/payments", paymentsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
