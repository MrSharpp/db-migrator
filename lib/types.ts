import { Knex } from "knex";

export type ColumnsMap = Map<string, {}>;

export enum Operation {
    INSERT,
    UPDATE,
    DELETE,
}

export type TableMaps = Map<string, ColumnsMap>;

export type TableOperationsMap = Map<
    string,
    { columnsOperationMap: ColumnOperationMap; tableOperation: Operation }
>;

export type ColumnOperationMap = Map<
    string,
    {
        colInfo: Record<string, string>;
        columnOperation: Operation;
    }
>;

export type KnexDatabaseInstance = Knex<any>;
