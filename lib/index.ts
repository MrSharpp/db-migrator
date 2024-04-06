// usage
import { getDBObject } from "./DBDiff/getDBObject";
import { getDBInspector } from "./DBDiff/getDBInspector";
import { getDBDiff } from "./DBDiff/getDbDiff";

async function main() {
  const sourceDBInspector = await getDBInspector({
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "mohawk",
    },
  });

  const targetDBInspector = await getDBInspector({
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "mohawk_online",
    },
  });

  const sourceDB = await getDBObject(sourceDBInspector);
  const targetDB = await getDBObject(targetDBInspector);

  const result = await getDBDiff(sourceDB, targetDB);
}

main();
