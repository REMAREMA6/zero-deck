import { Pool } from 'pg';

export function createDatabasePool(connectionString: string): Pool {
  return new Pool({ connectionString, application_name: 'zerodeck-core-api' });
}
