import { loadConfig } from '../../config.js';
import { createDatabasePool } from '../../db/pool.js';
import { createAccountDeletionService } from './account-deletion.js';
import { createFreshAuthenticationGuard } from './fresh-authentication.js';

const config = loadConfig();
const database = createDatabasePool(config.DATABASE_URL);

try {
  const deletion = createAccountDeletionService(
    database,
    createFreshAuthenticationGuard(database),
    null,
  );
  const result = await deletion.executeDueDeletions();
  process.stdout.write(JSON.stringify(result) + '\n');
} catch {
  process.stderr.write('Account-deletion worker failed. No completion claim was emitted.\n');
  process.exitCode = 1;
} finally {
  await database.end();
}
