import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // go to home page
  await page.goto("/");
});

test.afterEach(async ({ page }) => {
  // log out
  await page.getByRole("button", { name: "Log Out" }).click();
});

test("login user", async ({ page }) => {
  await expect(page.getByRole("banner")).toMatchAriaSnapshot(`
    - link:
      - /url: /
    - text: Savorfolio
    - link "Search":
      - /url: /search
      - paragraph: Search
    - link "Log In":
      - /url: /auth/login
      - paragraph: Log In
    `);
  await page.getByRole("link", { name: "Log In" }).click();
  await expect(page.locator("form")).toMatchAriaSnapshot(`
    - heading "Log In" [level=4]
    - paragraph: Email
    - textbox "Email"
    - paragraph: Password
    - textbox "Password"
    - button "Log In"
    - link "New user? Register here!":
      - /url: /auth/register
      - paragraph: New user? Register here!
    `);
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("capstoneUser@savorfolio.com");
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("Savorfolio2025!");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByRole("banner")).toMatchAriaSnapshot(`
    - link:
      - /url: /
    - text: Savorfolio
    - link "Search":
      - /url: /search
      - paragraph: Search
    - link "Add Recipe":
      - /url: /add-input
      - paragraph: Add Recipe
    - button "Log Out":
      - paragraph: Log Out
    `);
});

test("register new user", async ({ page }) => {
  await page.getByRole("link", { name: "Log In" }).click();
  await page.getByRole("link", { name: "New user? Register here!" }).click();

  await expect(page.locator("form")).toMatchAriaSnapshot(`
    - heading "Register" [level=4]
    - paragraph: Email
    - textbox "Email"
    - paragraph: Password
    - textbox "Password"
    - button "Register"
    `);
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("newUser@savorfolio.com");
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("NewPassword1");

  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.locator("form")).toMatchAriaSnapshot(`
    - heading "Log In" [level=4]
    - paragraph: Email
    - textbox "Email"
    - paragraph: Password
    - textbox "Password"
    - button "Log In"
    - link "New user? Register here!":
      - /url: /auth/register
      - paragraph: New user? Register here!
    `);
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("newUser@savorfolio.com");
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("NewPassword1");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByRole("banner")).toMatchAriaSnapshot(`
    - link:
      - /url: /
    - text: Savorfolio
    - link "Search":
      - /url: /search
      - paragraph: Search
    - link "Add Recipe":
      - /url: /add-input
      - paragraph: Add Recipe
    - button "Log Out":
      - paragraph: Log Out
    `);
});
