DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS restaurant_tables CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE roles (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name text NOT NULL UNIQUE,
    pin_hash text NOT NULL,
    role_id integer REFERENCES roles(id),
    active boolean DEFAULT TRUE
);
CREATE TABLE restaurant_tables (
    id serial PRIMARY KEY,
    table_number integer NOT NULL UNIQUE,
    capacity integer NOT NULL
);

CREATE TABLE categories (
    id serial PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    category_id integer REFERENCES categories(id),
    price integer NOT NULL,
    available boolean DEFAULT TRUE
);

CREATE TABLE orders (
    id serial PRIMARY KEY,
    table_id integer REFERENCES restaurant_tables(id),
    server_id integer REFERENCES users(id),
    status text DEFAULT 'open'
);

CREATE TABLE order_items (
    id serial PRIMARY KEY,
    order_id integer REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id integer REFERENCES menu_items(id),
    quantity integer NOT NULL DEFAULT 1,
    price integer NOT NULL
);
CREATE TABLE payments (
    id serial PRIMARY KEY,
    order_id integer REFERENCES orders(id) ON DELETE CASCADE,
    amount integer NOT NULL
);
