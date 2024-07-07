import { serve } from "@hono/node-server";
import { Hono } from "hono";
import api from "./route/api";
import { cors } from "hono/cors";

const app = new Hono();

// cors
app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/todo", api);

const port = 5001;
console.log(`Server is running on port: http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
