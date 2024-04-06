import { ColumnsMap, DBTableColumnsMap } from "../types";

/**
 * Compares the columnsMap for a particular table of source & target.
 * @param {ColumnsMap} sourceColumns - The source columns map to compare.
 * @param {ColumnsMap} targetColumns - The target columns map to compare.
 * @returns An object containing the differences between the two sets of columns.
 */
function diffTablesColumns(
  sourceColumns: ColumnsMap,
  targetColumns: ColumnsMap
) {
  const missingInSource: ColumnsMap = new Map();
  const missingInTarget: ColumnsMap = new Map();

  const allColumns = new Set([
    ...sourceColumns.keys(),
    ...targetColumns.keys(),
  ]);

  for (const column of allColumns) {
    /**
     * If the column name doesn't exist in the source table columns map,
     * add it to the missingInSource map.
     */
    if (!sourceColumns.get(column)) missingInSource.set(column, {});

    /**
     * If the column name doesn't exist in the target table columns map,
     * add it to the missingInTarget map.
     */
    if (!targetColumns.get(column)) missingInTarget.set(column, {});
  }

  return { missingInSource, missingInTarget };
}

/**
 * Compares two database table columns maps and returns the differences between them.
 * @param {DBTableColumnsMap} sourceTableColumns - The map of columns for the source table.
 * @param {DBTableColumnsMap} targetTableColumns - The map of columns for the target table.
 * @returns An object containing the differences between the source and target table columns maps.
 */
export async function getDBDiffMaps(
  sourceTableColumns: DBTableColumnsMap,
  targetTableColumns: DBTableColumnsMap
) {
  const missingInSource: DBTableColumnsMap = new Map();
  const missingInTarget: DBTableColumnsMap = new Map();

  const allTables = new Set([
    ...sourceTableColumns.keys(),
    ...targetTableColumns.keys(),
  ]);

  for (const table of allTables) {
    /**
     * Retrieve columns map from source & target.
     */
    const sourceColumnsMap = sourceTableColumns.get(table);
    const targetColumnsMap = targetTableColumns.get(table);

    /**
     * If the columnsMap is undefined, meaning the tableColumns Map doesn't have
     * a record for this particular table name, add the table name with an empty columnsMap to the respective differences map.
     */
    if (!sourceColumnsMap) {
      missingInSource.set(table, new Map());
    } else if (!targetColumnsMap) {
      missingInTarget.set(table, new Map());
    } else {
      /**
       * If the columns map exists for both source and target, proceed to
       * diff source and target columns to get the differences.
       */
      const { missingInSource, missingInTarget } = diffTablesColumns(
        sourceColumnsMap,
        targetColumnsMap
      );

      missingInSource.set(table, missingInSource);
      missingInTarget.set(table, missingInTarget);
    }
  }

  return { missingInSource, missingInTarget };
}
