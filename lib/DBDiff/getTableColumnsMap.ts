import { SchemaInspector } from "knex-schema-inspector/dist/types/schema-inspector";
import { TableMaps } from "../types";

/**
 * Retrieves a mapping of table columns from the provided SchemaInspector.
 * @param {SchemaInspector} inspector - The SchemaInspector object used to inspect the schema.
 * @returns {Promise<TableMaps>} A promise that resolves to a mapping of table columns.
 */
export async function getTablesMap(
    inspector: SchemaInspector
): Promise<TableMaps> {
    // Retrieve column information from the database schema
    const tableAndColumnMaps = await inspector.columns();

    /**
     * Reduce the tableColumns array into a map where each table name maps to
     * a map of its columns.
     */
    return tableAndColumnMaps.reduce(
        (tablesMap: TableMaps, currentTableAndColumn) => {
            /**
             * Retrieve the map of columns for the current table from the previous map,
             * or create a new map if not found.
             */
            const columnsMap =
                tablesMap.get(currentTableAndColumn.table) || new Map();

            /**
             * Add the current column to the columns map for the table.
             * An empty object is used to store potential metadata about the column,
             * such as indices, in future implementations.
             */
            columnsMap.set(currentTableAndColumn.column, {});

            /**
             * Update the main map with the columns map for the current table.
             */
            tablesMap.set(currentTableAndColumn.table, columnsMap);

            return tablesMap;
        },
        new Map()
    );
}
