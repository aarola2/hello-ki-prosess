import { describe, expect, it } from 'vitest';
import { buildApp } from './app.js';

describe('buildApp', () => {
  it('svarer 404 på en rute som ikke finnes', async () => {
    const app = buildApp();

    const response = await app.inject({ method: 'GET', url: '/finnes-ikke' });

    expect(response.statusCode).toBe(404);
    await app.close();
  });

  it('svarer 200 med hilsenen som JSON på GET /api/hello', async () => {
    const app = buildApp();

    const response = await app.inject({ method: 'GET', url: '/api/hello' });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.json()).toEqual({ message: 'Hello World' });
    await app.close();
  });
});
