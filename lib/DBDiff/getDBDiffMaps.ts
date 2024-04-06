import { ColumnMetadataMap, TableColumnsMap } from "../types";

/**
 * Compares the ColumnMetadataMap for a particular table of source & target.
 * @param {ColumnMetadataMap} sourceColumns - The source columns map to compare.
 * @param {ColumnMetadataMap} targetColumns - The target columns map to compare.
 * @returns An object containing the differences between the two sets of columns.
 */
function diffTablesColumns(
  sourceColumns: ColumnMetadataMap,
  targetColumns: ColumnMetadataMap
) {
  const missingInSource: ColumnMetadataMap = new Map();
  const missingInTarget: ColumnMetadataMap = new Map();

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
 * @param {TableColumnsMap} sourceTableColumns - The map of columns for the source table.
 * @param {TableColumnsMap} targetTableColumns - The map of columns for the target table.
 * @returns An object containing the differences between the source and target table columns maps.
 */
export async function getDBDiffMaps(
  sourceTableColumns: TableColumnsMap,
  targetTableColumns: TableColumnsMap
) {
  const missingInSource: TableColumnsMap = new Map();
  const missingInTarget: TableColumnsMap = new Map();

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
     * If the ColumnMetadataMap is undefined, meaning the tableColumns Map doesn't have
     * a record for this particular table name, add the table name with an empty ColumnMetadataMap to the respective differences map.
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
