import { loadConfig } from './config.js';
import { buildApp } from './app.js';
import { createDatabasePool } from './db/pool.js';
import { createAccountRegistrationService } from './modules/identity/account-registration.js';
import { createEmailVerificationService } from './modules/identity/email-verification.js';
import { createSessionService } from './modules/identity/sessions.js';
import { createApprovedAccountDeletionPolicy, createAccountDeletionService } from './modules/identity/account-deletion.js';
import { createFreshAuthenticationGuard } from './modules/identity/fresh-authentication.js';

const config = loadConfig();
const database = createDatabasePool(config.DATABASE_URL);
const accountRegistration = createAccountRegistrationService(database, null);
const emailVerification = createEmailVerificationService(database, null, null);
const sessionService = createSessionService(database);
const accountDeletion = createAccountDeletionService(
  database,
  createFreshAuthenticationGuard(database),
  createApprovedAccountDeletionPolicy(),
);
const app = buildApp({
  database,
  accountRegistration,
  emailVerification,
  sessionService,
  accountDeletion,
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
