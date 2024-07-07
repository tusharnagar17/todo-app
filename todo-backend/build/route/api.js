"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const api = new hono_1.Hono();
// GET todo
api.get("/", async (c) => {
    try {
        const res = await db_1.default.select().from(schema_1.todoTable);
        console.log("get request response", res);
        return c.json(res);
    }
    catch (error) {
        console.log(error);
    }
});
// POST todo
api.post("/", async (c) => {
    const data = await c.req.json();
    console.log("request data", data);
    try {
        const response = await db_1.default.insert(schema_1.todoTable).values(data);
        c.status(201);
        return c.json({ message: "succesfully created!" });
    }
    catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ message: `Unable to create request: ${error.message}` });
    }
});
// PUT todo
api.put("/:id", async (c) => {
    const id = c.req.param("id");
    try {
        // Fetch the current todo item by id
        const currentTodo = await db_1.default
            .select()
            .from(schema_1.todoTable)
            .where((0, drizzle_orm_1.eq)(schema_1.todoTable.id, Number(id)))
            .then((results) => results[0]);
        if (!currentTodo) {
            c.status(404); // Set status here
            return c.json({ message: "Todo item not found!" });
        }
        // Toggle the 'status' field
        const updatedStatus = !currentTodo.status;
        // Update the 'status' field for the todo item
        const response = await db_1.default
            .update(schema_1.todoTable)
            .set({ status: updatedStatus })
            .where((0, drizzle_orm_1.eq)(schema_1.todoTable.id, Number(id)));
        c.status(200); // Set status here
        return c.json({ message: "Successfully toggled 'status'!" });
    }
    catch (error) {
        console.log(error);
        c.status(500); // Set status here
        return c.json({ message: `Unable to toggle 'status': ${error.message}` });
    }
});
// DELETE todo
api.delete("/:id", async (c) => {
    const id = c.req.param("id");
    try {
        await db_1.default.delete(schema_1.todoTable).where((0, drizzle_orm_1.eq)(schema_1.todoTable.id, Number(id)));
        c.status(200);
        return c.json({ message: "Successfully deleted!" });
    }
    catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ message: `Unable to delete request: ${error.message}` });
    }
});
exports.default = api;
