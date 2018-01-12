import { Pool, QueryResult } from 'pg';

export class DB {
  private readonly pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString });
  }

  query(text, params?): Promise<QueryResult> {
    return this.pool.query(text, params)
  }
}