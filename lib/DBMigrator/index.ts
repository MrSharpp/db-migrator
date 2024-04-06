import { KnexDatabaseInstance, TableColumnsMap } from "../types";

export function migrateDB(
    targetDB: KnexDatabaseInstance,
    tableColumnsDiff: TableColumnsMap
) {
    for (const row of tableColumnsDiff) {
        const [tableName, columnsMetaMap] = row;
        targetDB.table(tableName);
    }
}
