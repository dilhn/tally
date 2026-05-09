import { test, expect } from '@playwright/test';

test('GET /health returns 200 with ok status', async ({ request }) => {
  const response = await request.get('/health');
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.status).toBe('ok');
  expect(body.service).toBe('tally-api');
  expect(body.timestamp).toBeTruthy();
});
