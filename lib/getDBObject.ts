import { SchemaInspector } from "knex-schema-inspector/dist/types/schema-inspector";
import { DBTableColumnsMap } from "./types";

type ColumnsInfo = {
  table: string;
  column: string;
};

function getTableColumnsMap(colsInfo: ColumnsInfo[]): DBTableColumnsMap {
  return colsInfo.reduce((prev: DBTableColumnsMap, cur) => {
    const tabCols = prev.get(cur.table) || new Map();

    tabCols.set(cur.column, {});

    return prev;
  }, new Map());
}

export async function getDBObject(
  inspector: SchemaInspector
): Promise<DBTableColumnsMap> {
  const tableColumns = await inspector.columns();

  return getTableColumnsMap(tableColumns);
}
