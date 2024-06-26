import {
    ColumnOperationMap,
    ColumnsMap,
    Operation,
    TableMaps,
    TableOperationsMap,
} from "../types";

/**
 * Compares the ColumnsMap for a particular table of source & target.
 * @param {ColumnsMap} sourceColumnsMap - The source columns map to compare.
 * @param {ColumnsMap} targetColumnsMap - The target columns map to compare.
 * @returns A map containing columns operations map
 */
function getColumnsDiff(
    sourceColumnsMap: ColumnsMap,
    targetColumnsMap: ColumnsMap
): ColumnOperationMap {
    const missingInTarget: ColumnOperationMap = new Map();

    for (const columnName of sourceColumnsMap.keys()) {
        /**
         * If the columnName doesn't exist in the target table columns map,
         * add it to the missingInTarget map.
         */
        if (!targetColumnsMap.get(columnName))
            missingInTarget.set(columnName, {
                colInfo: sourceColumnsMap.get(columnName)!,
                columnOperation: Operation.INSERT,
            });
    }

    return missingInTarget;
}

/**
 * Compares two database table columns maps and returns the differences between them.
 * @param {TableMaps} sourceTablesMap - The map of columns for the source table.
 * @param {TableMaps} targetTableColumns - The map of columns for the target table.
 * @returns tables operations map
 */
export async function getTablesDiff(
    sourceTablesMap: TableMaps,
    targetTablesMap: TableMaps
): Promise<TableOperationsMap> {
    const diffTargetTables: TableOperationsMap = new Map();

    for (const tableName of sourceTablesMap.keys()) {
        /**
         * Retrieve columns map from source & target.
         */
        const sourceColumnsMap = sourceTablesMap.get(tableName)!;
        const targetColumnsMap = targetTablesMap.get(tableName);

        /**
         * If the columns map exists for both source and target, proceed to
         * diff source and target columns to get the missing columns in target.
         */
        const columnsMissing = getColumnsDiff(
            sourceColumnsMap,
            targetColumnsMap || new Map()
        );

        /**
         * If there is no columns missing in targetDB then dont add to diffTargetTables
         */
        if (!columnsMissing.size) continue;

        /**
         * If the targetColumns doesnt exist in targetDB then tableOperation will be INSERT otherwise it will be UPDATE
         */
        const tableOperation = !targetTablesMap
            ? Operation.INSERT
            : Operation.UPDATE;

        diffTargetTables.set(tableName, {
            columnsOperationMap: columnsMissing,
            tableOperation,
        });
    }

    return diffTargetTables;
}
