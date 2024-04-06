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
  const tableColumns = await inspector.columns();

  return tableColumns.reduce((prev: DBTableColumnsMap, cur) => {
    /**
     * Retrieves the Map of tabCols for the given table from the previous Map, or creates a new Map if not found.
     */
    const columnsMap = prev.get(cur.table) || new Map();

    /**
     * Set the columns map, with column name and an empty object
     * NOTE: Empty object is intented for future use, to store meta info about a particular columns
     * like indices
     */
    columnsMap.set(cur.column, {});

    /**
     * Now finally setting the columns mapping to main map object with key as table name
     */
    prev.set(cur.table, columnsMap);

    return prev;
  }, new Map());
}
