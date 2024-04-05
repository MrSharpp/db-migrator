import { ColumnsMap, DBTableColumnsMap } from "./types";

function diffTables(srcCols: ColumnsMap, targtCols: ColumnsMap) {
  const sourceDiff: ColumnsMap = new Map();
  const targetDiff: ColumnsMap = new Map();

  const colsUnion = new Set([...srcCols.keys(), ...targtCols.keys()]);

  for (const col of colsUnion) {
    // check if column C doesnt exsits in targetCols
    if (!srcCols.get(col)) sourceDiff.set(col, {});
    if (!targtCols.get(col)) targetDiff.set(col, {});
  }

  return { sourceDiff, targetDiff };
}

export async function getDBDiff(
  srcColsInfo: DBTableColumnsMap,
  tgtColsInfo: DBTableColumnsMap
) {
  const sourceDiff: DBTableColumnsMap = new Map();
  const targetDiff: DBTableColumnsMap = new Map();

  const tablesUnion = new Set([...srcColsInfo.keys(), ...tgtColsInfo.keys()]);

  for (const table of tablesUnion) {
    // diff if table T exsist in sourceTable, if not add it to sourceDiff
    const srcCol = srcColsInfo.get(table);
    const targtCol = tgtColsInfo.get(table);

    if (!srcCol) {
      sourceDiff.set(table, new Map());
      continue;
    }
    if (!targtCol) {
      targetDiff.set(table, new Map());
      continue;
    }

    // diff cols
    const colsDiff = diffTables(srcCol, targtCol);
  }
}
