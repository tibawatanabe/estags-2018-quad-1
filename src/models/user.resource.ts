import { DB } from '../db';

export class UserResource {
  private readonly db: DB;
  
  constructor() {
    this.db = new DB(process.env.DATABASE_URL || 'postgres://localhost:5432/template');
  }

  async list(): Promise<any[]> {
    const query = 'SELECT * FROM users2';

    const result = await this.db.query(query);
    console.log(result);
    return [];
  }
}

// const db = require('../db');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/template';

// const client = new pg.Client(connectionString);
// client.connect();
// const query = db.query(
//   'CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(50) not null, password VARCHAR(50) not null)');
// query.on('end', () => { client.end(); });
