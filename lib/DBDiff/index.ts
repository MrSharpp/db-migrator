import SchemaInspector from "knex-schema-inspector";
import { KnexInstance } from "../types";
import { getTableColumnsMap } from "./getTableColumnsMap";
import { getDBDiffMaps } from "./getDBDiffMaps";

/**
 * Retrieves the difference between the database schemas of two Knex instances.
 * @param {KnexInstance} sourceDB - The source Knex instance.
 * @param {KnexInstance} targetDB - The target Knex instance.
 * @returns {Promise<void>} A promise that resolves once the comparison is complete.
 */
export async function getDBDiff(
  sourceDB: KnexInstance,
  targetDB: KnexInstance
): Promise<void> {
  // Create SchemaInspector instances for both source and target databases
  const sourceSchemaInspector = SchemaInspector(sourceDB);
  const targetSchemaInspector = SchemaInspector(targetDB);

  // Retrieve database schema information for both source and target databases
  const sourceDBMap = await getTableColumnsMap(sourceSchemaInspector);
  const targetDBMap = await getTableColumnsMap(targetSchemaInspector);

  // Get the differences between the database schema maps of source and target databases
  const result = await getDBDiffMaps(sourceDBMap, targetDBMap);
}
