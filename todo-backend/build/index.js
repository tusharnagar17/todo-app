"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const api_1 = require("./route/api");
const cors_1 = require("hono/cors");
require("dotenv/config");
const app = new hono_1.Hono();
// cors
app.use((0, cors_1.cors)());
app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.route("/api/todo", api_1.default);
const port = Number(process.env.PORT);
console.log(`Server is running on port: http://localhost:${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port,
});
