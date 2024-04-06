import { Knex } from "knex";

export type ColumnMetadataMap = Map<string, {}>;

export enum Operation {
    INSERT,
    UPDATE,
    DELETE,
}

export type TableMaps = Map<string, ColumnMetadataMap>;

export type TableOperationsMap = Map<
    string,
    { columns: ColumnMetadataMap; operation: Operation }
>;

export type KnexDatabaseInstance = Knex<any>;
