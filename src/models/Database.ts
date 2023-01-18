import mysql, { Connection, FieldInfo, MysqlError } from "mysql";
import { config } from "../config/config";

export type queryCallback = (err: MysqlError | Error | null, results?: any, fields?: FieldInfo[]) => void;

export interface IDBModel<Params> {
  connection: Connection
  tableName?: string
  save?: (params: Params, cb?: queryCallback) => void
  findById? (params: Params, cb?: queryCallback): void
  find? (cb?: queryCallback): void
  update? (params: Params, cb?: queryCallback): void
  delete? (params: Params, cb?: queryCallback): void
}

class Database implements IDBModel<{}>{
  connection: Connection

  connect(cb: (err: MysqlError) => void) {
    this.connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database
    })
    this.connection.connect(cb)
  }
}

export const iDatabase = new Database()
