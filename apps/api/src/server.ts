import { loadConfig } from './config.js';
import { buildApp } from './app.js';
import { createDatabasePool } from './db/pool.js';
import { createAccountRegistrationService } from './modules/identity/account-registration.js';

const config = loadConfig();
const database = createDatabasePool(config.DATABASE_URL);
const accountRegistration = createAccountRegistrationService(database, null);
const app = buildApp({ database, accountRegistration, logger: config.NODE_ENV !== 'test' });
app.addHook('onClose', async () => {
  await database.end();
});

try {
  await app.listen({ host: config.HOST, port: config.PORT });
} catch (error) {
  app.log.error({ err: error }, 'API startup failed');
  await app.close();
  process.exitCode = 1;
}
