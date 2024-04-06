import { ColumnMetadataMap, TableMaps } from "../types";

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
    const missingInTarget: ColumnMetadataMap = new Map();

    const allColumns = new Set([
        ...sourceColumns.keys(),
        ...targetColumns.keys(),
    ]);

    for (const column of allColumns) {
        /**
         * If the column name doesn't exist in the target table columns map,
         * add it to the missingInTarget map.
         */
        if (!targetColumns.get(column)) missingInTarget.set(column, {});
    }

    return missingInTarget;
}

/**
 * Compares two database table columns maps and returns the differences between them.
 * @param {TableMaps} sourceTableColumns - The map of columns for the source table.
 * @param {TableMaps} targetTableColumns - The map of columns for the target table.
 * @returns An object containing the differences between the source and target table columns maps.
 */
export async function getDBDiffMaps(
    sourceTableColumns: TableMaps,
    targetTableColumns: TableMaps
) {
    const missingInTarget: TableMaps = new Map();

    for (const tableName of sourceTableColumns.keys()) {
        /**
         * Retrieve columns map from source & target.
         */
        const sourceColumnsMap = sourceTableColumns.get(tableName) as TableMaps;
        const targetColumnsMap = targetTableColumns.get(tableName);

        /**
         * if the targetColumnsMap is not found means this table doesnt exsits in targetDB
         */
        if (!targetColumnsMap) {
            missingInTarget.set(tableName, new Map());
            continue;
        }

        /**
         * If the columns map exists for both source and target, proceed to
         * diff source and target columns to get the missing columns in target.
         */
        const columnsMissing = diffTablesColumns(
            sourceColumnsMap,
            targetColumnsMap
        );

        missingInTarget.set(tableName, columnsMissing);
    }

    return missingInTarget;
}
