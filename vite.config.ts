/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",         // needed for DOM testing
    globals: true,                // allows using `describe`, `it`, `expect` globally
    // setupFiles: "./src/setupTests.ts",  // optional: test setup file
    css: true,                    // allow importing CSS in tests
    coverage: {
      reporter: ["text", "json", "html"],  // generates coverage reports
    },
    exclude: [
      "node_modules",
      "dist",
      "e2e",
      "playwright.config.*",
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
