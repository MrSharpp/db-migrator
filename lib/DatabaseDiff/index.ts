import SchemaInspector from "knex-schema-inspector";
import { KnexDatabaseInstance, TableOperationsMap } from "../types";
import { getTablesMap } from "./getTablesMap";
import { getTablesDiff } from "./getTablesDiff";

/**
 * Retrieves the difference between the database schemas of two Knex instances.
 * @param {KnexDatabaseInstance} sourceDB - The source Knex instance.
 * @param {KnexDatabaseInstance} targetDB - The target Knex instance.
 * @returns {Promise<TableMaps>} A promise that resolves once the comparison is complete.
 */
export async function getDBDiff(
    sourceDB: KnexDatabaseInstance,
    targetDB: KnexDatabaseInstance
): Promise<TableOperationsMap> {
    // Create SchemaInspector instances for both source and target databases
    const sourceSchemaInspector = SchemaInspector(sourceDB);
    const targetSchemaInspector = SchemaInspector(targetDB);

    const sourceTablesMap = await getTablesMap(sourceSchemaInspector);
    const targetTablesMap = await getTablesMap(targetSchemaInspector);

    // Retrieve database schema information for both source and target databases
    const targetTablesDiff = await getTablesDiff(
        sourceTablesMap,
        targetTablesMap
    );

    // Get the differences between the database schema maps of source and target databases
    return targetTablesDiff;
}
