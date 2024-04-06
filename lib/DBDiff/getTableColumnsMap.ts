import { SchemaInspector } from "knex-schema-inspector/dist/types/schema-inspector";
import { DBTableColumnsMap } from "../types";

/**
 * Retrieves a mapping of table columns from the provided SchemaInspector.
 * @param {SchemaInspector} inspector - The SchemaInspector object used to inspect the schema.
 * @returns {Promise<DBTableColumnsMap>} A promise that resolves to a mapping of table columns.
 */
export async function getTableColumnsMap(
  inspector: SchemaInspector
): Promise<DBTableColumnsMap> {
  // Retrieve column information from the database schema
  const tableColumns = await inspector.columns();

  /**
   * Reduce the tableColumns array into a map where each table name maps to
   * a map of its columns.
   */
  return tableColumns.reduce(
    (tableColumnsMap: DBTableColumnsMap, currentColumn) => {
      /**
       * Retrieve the map of columns for the current table from the previous map,
       * or create a new map if not found.
       */
      const columnsMapForTable =
        tableColumnsMap.get(currentColumn.table) || new Map();

      /**
       * Add the current column to the columns map for the table.
       * An empty object is used to store potential metadata about the column,
       * such as indices, in future implementations.
       */
      columnsMapForTable.set(currentColumn.column, {});

      /**
       * Update the main map with the columns map for the current table.
       */
      tableColumnsMap.set(currentColumn.table, columnsMapForTable);

      return tableColumnsMap;
    },
    new Map()
  );
}
