import { describe, expect, it } from 'vitest';
import { buildApp } from './app.js';

describe('buildApp', () => {
  it('svarer 404 på en rute som ikke finnes', async () => {
    const app = buildApp();

    const response = await app.inject({ method: 'GET', url: '/finnes-ikke' });

    expect(response.statusCode).toBe(200);
    await app.close();
  });
});
