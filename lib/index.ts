// usage
import Knex from "knex";
import { getDBDiff } from "./DatabaseDiff";

async function main() {
    const dbSource = Knex({
        client: "mysql2",
        connection: {
            host: "localhost",
            user: "root",
            password: "root",
            database: "mohawk",
        },
    });

    const dbTarget = Knex({
        client: "mysql2",
        connection: {
            host: "localhost",
            user: "root",
            password: "root",
            database: "mohawk_online",
        },
    });

    const diffs = getDBDiff(dbSource, dbTarget);
}

main();
