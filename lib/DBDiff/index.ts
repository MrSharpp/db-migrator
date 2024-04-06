import SchemaInspector from "knex-schema-inspector";
import { KnexInstance } from "../types";

export function getDBDiff(sourceDB: KnexInstance, targetDB: KnexInstance) {
  const sourceSchemaInspector = SchemaInspector(sourceDB);
  const targetSchemaInspector = SchemaInspector(targetDB);
}
