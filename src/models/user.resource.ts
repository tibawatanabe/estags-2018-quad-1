import { DB } from '../db';
import User from '../user';

export class UserResource {
  private readonly db: DB;
  private table: String = "users3"
  
  constructor() {
    this.db = new DB(process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/template');
    // this.db = new DB(process.env.DATABASE_URL || 'postgres://localhost:5432/template');
  }

  async list(): Promise<any>{
    const query = 'SELECT * FROM '+this.table;
    const result = await this.db.query(query);
    return result;
  }

  async select(id: Number): Promise<any> {
    const query = 'SELECT * FROM '+this.table+' where id = '+id;
    debugger;
    const result = await this.db.query(query);
    return result;
  }

  async delete(id: number): Promise<any>{
    const query = 'DELETE FROM '+this.table+' WHERE id = '+id;
    debugger;
    const result = await this.db.query(query);
    return result;
  }

  async create(email: String, password: String){
    const query = "INSERT INTO "+this.table+" (email, password) VALUES ('"+email+"', '"+password+"');";
    debugger;
    const result = await this.db.query(query);
    return result;
  }
}


// const db = require('../db');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/template';

// const client = new pg.Client(connectionString);
// client.connect();
// const query = db.query(
//   'CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(50) not null, password VARCHAR(50) not null)');
// query.on('end', () => { client.end(); });
