import { serve } from "@hono/node-server";
import { Hono } from "hono";
import api from "./route/api";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/todo", api);

const port = 3000;
console.log(`Server is running on port ${port}`, "http://localhost:3000");

serve({
  fetch: app.fetch,
  port,
});
