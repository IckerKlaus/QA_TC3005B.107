const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

const hasQaseConfig = Boolean(
  process.env.QASE_TESTOPS_API_TOKEN && process.env.QASE_TESTOPS_PROJECT,
);

const reporters = [['list']];

if (hasQaseConfig) {
  reporters.push([
    'playwright-qase-reporter',
    {
      mode: 'testops',
      testops: {
        api: { token: process.env.QASE_TESTOPS_API_TOKEN },
        project: process.env.QASE_TESTOPS_PROJECT,
        run: {
          title:
            process.env.QASE_TESTOPS_RUN_TITLE ||
            'Act2 - SauceDemo E2E Checkout',
        },
      },
    },
  ]);
}

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: reporters,
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
