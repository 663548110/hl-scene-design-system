const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e-v2',
  timeout: 30000,
  retries: 1,
  workers: 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
        },
      },
    },
  ],
  webServer: [
    {
      command: 'node server/start-e2e.js',
      port: 3200,
      reuseExistingServer: true,
    },
    {
      command: 'pnpm dev',
      port: 8080,
      reuseExistingServer: true,
      timeout: 60000,
    },
  ],
});
