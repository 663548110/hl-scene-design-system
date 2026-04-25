const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  webServer: [
    {
      command: 'node server/index.js',
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
