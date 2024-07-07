"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const postgres_1 = require("postgres");
const postgres_js_1 = require("drizzle-orm/postgres-js");
if (process.env.NODE_ENV === "production") {
    console.log("Running in production mode.");
    (0, dotenv_1.config)({ path: ".env" });
}
else {
    console.log("Running in development mode.");
    (0, dotenv_1.config)({ path: ".env" });
}
const { DATABASE_URL } = process.env;
const databaseUrl = (0, postgres_js_1.drizzle)((0, postgres_1.default)(DATABASE_URL, { ssl: "require", max: 1 }));
const main = async () => {
    try {
        await (0, migrator_1.migrate)(databaseUrl, { migrationsFolder: "drizzle" });
        console.log("Migration complete");
    }
    catch (error) {
        console.log(error);
    }
    process.exit(0);
};
main();
