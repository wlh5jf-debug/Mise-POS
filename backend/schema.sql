CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    role_id integer REFERENCES roles(id),
);

CREATE TABLE restaurant_tables (
    id SERIAL PRIMARY KEY,
    table_number INT NOT NULL UNIQUE,
    capacity INT NOT NULL,
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    category_id integer REFERENCES categories(id),
    price integer NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    table_id integer REFERENCES restaurant_tables(id),
    server_id integer REFERENCES users(id),
    status text DEFAULT 'open',
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id integer REFERENCES menu_items(id),
    quantity integer NOT NULL DEFAULT 1,
    price integer NOT NULL
);
amount
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
     integer NOT NULL
);
