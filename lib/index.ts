// usage
import { getDBColumnsMap } from "./DBDiff/getDBColumnsMap";
import { getDBDiffMaps } from "./DBDiff/getDBDiffMaps";
import Knex from "knex";

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

  const sourceDB = await getDBColumnsMap(sourceDBInspector);
  const targetDB = await getDBColumnsMap(targetDBInspector);

  const result = await getDBDiffMaps(sourceDB, targetDB);
}

main();
