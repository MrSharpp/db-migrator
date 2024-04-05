export async function getDiffColumns(
  srcColsInfo: DBObject[],
  tgtColsInfo: DBObject[]
) {
  const diffColumns: Map<string, { source: DBObject; target: DBObject }[]> =
    new Map();

  for (const colInfo of srcColsInfo) {
  }
}
