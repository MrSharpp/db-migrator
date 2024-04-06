import { SchemaInspector } from "knex-schema-inspector/dist/types/schema-inspector";
import { DBTableColumnsMap } from "../types";

type ColumnsInfo = {
  table: string;
  column: string;
};

function getTableColumnsMap(tableCols: ColumnsInfo[]): DBTableColumnsMap {
  return tableCols.reduce((prev: DBTableColumnsMap, cur) => {
    const tabCols = prev.get(cur.table) || new Map();

    tabCols.set(cur.column, {});

    prev.set(cur.table, tabCols);

    return prev;
  }, new Map());
}

export async function getDBColumnsMap(
  inspector: SchemaInspector
): Promise<DBTableColumnsMap> {
  const tableColumns = await inspector.columns();

  return getTableColumnsMap(tableColumns);
}
