import Knex from "knex";
import SchemaInspector from "knex-schema-inspector";

export async function getDBInspector(config: Knex.Knex.Config<any>) {
  const database = Knex(config);

  return SchemaInspector(database);
}
