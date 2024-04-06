import { KnexDatabaseInstance } from "../../types";

export function createColumn(
    tableName: string,
    columnInfo: { name: string; info: Record<string, any> },
    dbInstance: KnexDatabaseInstance
) {
    dbInstance.schema.alterTable(tableName, function (t) {});
}
