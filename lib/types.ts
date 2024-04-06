import { Knex } from "knex";

export type ColumnsMap = Map<string, {}>;

export type DBTableColumnsMap = Map<string, ColumnsMap>;

export type KnexInstance = Knex<any>;
