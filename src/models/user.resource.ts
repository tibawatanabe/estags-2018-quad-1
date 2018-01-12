import { DB } from '../db';
import User from '../user';

export class UserResource {
  private readonly db: DB;
  
  constructor() {
    this.db = new DB(process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/template');
    // this.db = new DB(process.env.DATABASE_URL || 'postgres://localhost:5432/template');
  }

  list() {
    const query = 'SELECT * FROM users2';
    return this.db.query(query);
  }

  async select(id: Number): Promise<any> {
    const query = 'SELECT * FROM users2 where id = '+id;
    debugger;
    const result = await this.db.query(query);
  }
}


// const db = require('../db');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/template';

// const client = new pg.Client(connectionString);
// client.connect();
// const query = db.query(
//   'CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(50) not null, password VARCHAR(50) not null)');
// query.on('end', () => { client.end(); });
