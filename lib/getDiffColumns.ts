function diffTables() {}

export async function getDBDiff(
  srcColsInfo: DBTableColumnsMap,
  tgtColsInfo: DBTableColumnsMap
) {
  const sourceDiff: DBTableColumnsMap = new Map();
  const targetDiff: DBTableColumnsMap = new Map();

  const tablesUnion = new Set([...srcColsInfo.keys(), ...tgtColsInfo.keys()]);

  for (const table of tablesUnion) {
    // diff if table T exsist in sourceTable, if not add it to sourceDiff
    if (!sourceDiff.get(table)) sourceDiff.set(table, []);

    // diff cols
  }
}
