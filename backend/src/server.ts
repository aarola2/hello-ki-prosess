import { buildApp } from './app.js';
import { describeListenError } from './listen-error.js';

const PORT = 3000;

const app = buildApp({ logger: true });

try {
  await app.listen({ port: PORT });
} catch (error) {
  console.error(describeListenError(error, PORT));
  process.exit(1);
}
