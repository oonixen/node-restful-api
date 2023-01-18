import { Connection } from "mysql";
import { IDBModel, queryCallback } from "./Database";
import { CustomError } from "./CustomError";

export interface IAuthorModel {
  id?: string
  name?: string
}

export class Author implements IDBModel<IAuthorModel> {

  tableName = 'author'
  connection: Connection

  constructor({connection}: {connection: Connection}) {
    this.connection = connection
  }

  save ({name}: IAuthorModel, cb?: queryCallback) {
    const sql = `INSERT INTO ${this.tableName} SET ?;`
    this.connection.query(sql, {name}, cb)
  }

  findById({id}: IAuthorModel, cb?: queryCallback) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?;`
    this.connection.query(sql, [id], cb)
  }

  find(cb?: queryCallback) {
    const sql = `SELECT * FROM ${this.tableName};`
    this.connection.query(sql,[], cb)
  }

  update({id, name}: IAuthorModel, cb?: queryCallback) {
    const sql = `UPDATE ${this.tableName} SET name = ? WHERE id = ?;`
    this.connection.query(sql, [name, id], cb)
  }

  delete({id}: IAuthorModel, cb?: queryCallback) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?;`
    this.connection.query(sql, [id], cb)
  }
}