// usage
import { getDBColumnsMap } from "./DBDiff/getDBColumnsMap";
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

  const sourceDB = await getDBColumnsMap(sourceDBInspector);
  const targetDB = await getDBColumnsMap(targetDBInspector);

  const result = await getDBDiff(sourceDB, targetDB);
}

main();
