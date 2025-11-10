import { defineConfig, devices } from '@playwright/test';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
    testDir: './e2e',
    testMatch: ['**/*.spec.ts', '**/*.e2e.ts'],
    timeout: 60000,
    /* manually set output directory */
    outputDir: path.join(os.tmpdir(), 'playwright-output'), // system temp folder
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if test.only is in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'http://localhost:5173/',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

  /* Run your local dev server before starting the tests */
    webServer: [//
        {
            command: 'dotnet run --project savorfolio-backend.csproj', // Command to start backend
            url: 'http://localhost:5188/health', // backend URL
            name: 'Backend',
            reuseExistingServer: false,
            cwd: '../savorfolio-backend/src', // explicitly set working directory for backend
            env: {
                ASPNETCORE_ENVIRONMENT: 'Test', // triggers .env.test load in backend
                NODE_ENV: "test",
            },
        },
        {
            command: 'npm run dev', // Command to start frontend
            url: 'http://localhost:5173/', // frontend URL
            name: 'Frontend',
            reuseExistingServer: false,
        },
    ],
});
