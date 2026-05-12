import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const apiBaseURL = process.env.API_BASE_URL || 'http://localhost:3001';

export default defineConfig({
  testDir: './src',

  webServer: {
    command: 'npm run dev',
    cwd: path.resolve(__dirname, '../frontend'),
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: '../playwright-report' }], ['list']],

  projects: [
    {
      name: 'ui',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL,
      },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: apiBaseURL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});
