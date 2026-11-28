import { loadConfig } from './config.js';
import { buildApp } from './app.js';
import { createDatabasePool } from './db/pool.js';
import { createAccountRegistrationService } from './modules/identity/account-registration.js';
import { createEmailVerificationService } from './modules/identity/email-verification.js';

const config = loadConfig();
const database = createDatabasePool(config.DATABASE_URL);
const accountRegistration = createAccountRegistrationService(database, null);
const emailVerification = createEmailVerificationService(database, null, null);
const app = buildApp({
  database,
  accountRegistration,
  emailVerification,
  logger: config.NODE_ENV !== 'test',
});
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
