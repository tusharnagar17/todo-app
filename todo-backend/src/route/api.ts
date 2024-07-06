import { Hono } from "hono";
import db from "../drizzle/db";
import { InsertTodo, todoTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const api = new Hono();

// GET todo
api.get("/", async (c) => {
  try {
    const res = await db.select().from(todoTable);
    console.log("get request response", res);

    return c.json(res);
  } catch (error) {
    console.log(error);
  }
});

// POST todo
api.post("/", async (c) => {
  const data = await c.req.json();
  console.log("request data", data);
  try {
    const response = await db.insert(todoTable).values(data);

    c.status(201);
    return c.json({ message: "succesfully created!" });
  } catch (error: any) {
    console.log(error);
    c.status(500);
    return c.json({ message: `Unable to create request: ${error.message}` });
  }
});

// PUT todo
api.put("/:id", async (c) => {
  const id = c.req.param("id");
  const data = await c.req.json();
  console.log("update request data", data);
  try {
    const response = await db
      .update(todoTable)
      .set(data)
      .where(eq(todoTable.id, Number(id)));

    c.status(200);
    return c.json({ message: "Successfully updated!" });
  } catch (error: any) {
    console.log(error);
    c.status(500);
    return c.json({ message: `Unable to update request: ${error.message}` });
  }
});

// DELETE todo
api.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    await db.delete(todoTable).where(eq(todoTable.id, Number(id)));

    c.status(200);
    return c.json({ message: "Successfully deleted!" });
  } catch (error: any) {
    console.log(error);
    c.status(500);
    return c.json({ message: `Unable to delete request: ${error.message}` });
  }
});
export default api;
