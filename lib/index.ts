// usage
import { getDBColumnsMap } from "./DBDiff/getDBColumnsMap";
import { getSchemaInspector } from "./DBDiff/getSchemaInspector";
import { getDBDiffMaps } from "./DBDiff/getDBDiffMaps";

async function main() {
  const sourceDBInspector = await getSchemaInspector({
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "mohawk",
    },
  });

  const targetDBInspector = await getSchemaInspector({
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
