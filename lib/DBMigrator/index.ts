import { KnexDatabaseInstance, TableOperationsMap } from "../types";

export function syncSchema(
    targetDB: KnexDatabaseInstance,
    tablesOperationsMap: TableOperationsMap
) {
    for (const row of tablesOperationsMap) {
        const [tableName, { columnsOperationMap, tableOperation }] = row;

        targetDB.table(tableName);
    }
}
