import db from "#db/client"
import { getRoles, createRole } from "./queries/roles.js";
import { createUser } from "./queries/users.js";
import { createTable } from "./queries/restaurant_tables.js";
import { createCategory } from "./queries/categories.js";
import { createMenuItem } from "./queries/menu_items.js";
import { createOrder } from "./queries/orders.js";
import { addItemToOrder } from "./queries/orders_items.js";
import { addPayment } from "./queries/payments.js"
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed(){

// Seed Roles

let roles = await getRoles();
if (roles.length === 0) {
  await createRole("Admin");
  await createRole("Server");
  roles = await getRoles();
}

const roleIds = {};
for (const role of roles) {
  roleIds[role.name] = role.id;
}

// Seed Users 

const admin = await createUser("Beth", roleIds.admin, "1234");
const tim = await createUser("Tim", roleIds.server, "5678");
const nancy = await createUser("Nancy", roleIds.server, "9101");

// Seed Tables 

await createTable(1, 4);
await createTable(2, 4);
await createTable(3, 2);
await createTable(4, 6);
await createTable(5, 4);

// Seed Categories 

const appetizers = await createCategory("Appetizer");
const mains = await createCategory("Main Course");
const desserts = await createCategory("Desserts");
const drinks = await createCategory("Drinks");

// Seed Menu Items

const mozz = await createMenuItem("Mozzarella Sticks", appetizers.id, 800);
const salad = await createMenuItem("Caesar Salad", appetizers.id, 1200);
const chicken = await createMenuItem("Grilled Chicken", mains.id, 2500);
const steak = await createMenuItem("Steak", mains.id, 4000);
const cheesecake = await createMenuItem("Cheesecake", desserts.id, 1800);
const soda = await createMenuItem("Soda", drinks.id, 300);
const coffee = await createMenuItem("Coffee", drinks.id, 250);

// Seed Orders

const order1 = await createOrder(1, tim.id);
const order2 = await createOrder(2, nancy.id);

// Order Items

await addItemToOrder(order1.id, mozz.id, 2, mozz.price);
await addItemToOrder(order1.id, chicken.id, 1, chicken.price);
await addItemToOrder(order2.id, steak.id, 1, steak.price)
await addItemToOrder(order2.id, soda.id, 2, soda.price);

// Payments

await addPayment(order1.id, 4100);
await addPayment(order2.id, 4600);


}