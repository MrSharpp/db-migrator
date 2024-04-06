// usage
import { getDBObject } from "./getDBObject";
import { getDBInspector } from "./getDBInspector";
import { getDBDiff } from "./getDbDiff";

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

  console.log([...result.targetDiff.values()]);
}

main();
