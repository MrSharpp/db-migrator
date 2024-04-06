import { ColumnsMap, DBTableColumnsMap } from "./types";

function diffTables(srcCols: ColumnsMap, targtCols: ColumnsMap) {
  const sourceColumnsDiff: ColumnsMap = new Map();
  const targetColumnsDiff: ColumnsMap = new Map();

  const colsUnion = new Set([...srcCols.keys(), ...targtCols.keys()]);

  for (const col of colsUnion) {
    debugger;
    // check if column C doesnt exsits in targetCols & sourceCols
    if (!srcCols.get(col)) sourceColumnsDiff.set(col, {});
    if (!targtCols.get(col)) targetColumnsDiff.set(col, {});
  }

  return { sourceColumnsDiff, targetColumnsDiff };
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
    const { sourceColumnsDiff, targetColumnsDiff } = diffTables(
      srcCol,
      targtCol
    );

    // set the columns diff to respective table name to the respective map
    sourceDiff.set(table, sourceColumnsDiff);
    targetDiff.set(table, targetColumnsDiff);
  }

  return { sourceDiff, targetDiff };
}
