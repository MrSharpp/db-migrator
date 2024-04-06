import { Knex } from "knex";

export type ColumnMetadataMap = Map<string, {}>;

export type TableColumnsMap = Map<string, ColumnMetadataMap>;

export type KnexDatabaseInstance = Knex<any>;
