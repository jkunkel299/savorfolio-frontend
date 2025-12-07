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
  // assert that, before the user is logged in, the nav bar only shows options to search and log in
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
  // click the nav bar button "Log In"
  await page.getByRole("link", { name: "Log In" }).click();
  // assert the login page contains the email and password entries and login and register buttons
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
  // click the textbox for email
  await page.getByRole("textbox", { name: "Email" }).click();
  // type the email "capstoneUser@savorfolio.com" into the email textbox
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("capstoneUser@savorfolio.com");
  // tab to the next textbox - password
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  // type the password "Savorfolio2025!" into the password textbox
  await page.getByRole("textbox", { name: "Password" }).fill("Savorfolio2025!");
  // click the login button
  await page.getByRole("button", { name: "Log In" }).click();
  // assert the nav bar, after logging in, contains options for Search, Add Recipe, and Log Out
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
  // click the link in the nav bar to Log In
  await page.getByRole("link", { name: "Log In" }).click();
  // click the "New user? Register here!" button on the login page
  await page.getByRole("link", { name: "New user? Register here!" }).click();
  // assert the register page contains an email and password input, and a button to register
  await expect(page.locator("form")).toMatchAriaSnapshot(`
    - heading "Register" [level=4]
    - paragraph: Email
    - textbox "Email"
    - paragraph: Password
    - textbox "Password"
    - button "Register"
    `);
  // click on the email textbox
  await page.getByRole("textbox", { name: "Email" }).click();
  // enter "newUser@savorfolio.com" in the email textbox
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("newUser@savorfolio.com");
  // tab to the next textbox - password
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  // enter "NewPassword1" in the password textbox
  await page.getByRole("textbox", { name: "Password" }).fill("NewPassword1");
  // click the "Register" button
  await page.getByRole("button", { name: "Register" }).click();
  // assert the page redirects to the login form
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
  // click the email textbox
  await page.getByRole("textbox", { name: "Email" }).click();
  // enter "newUser@savorfolio.com" in the email textbox
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("newUser@savorfolio.com");
  // tab to the next textbox - password
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  // enter "NewPassword1" in the password textbox
  await page.getByRole("textbox", { name: "Password" }).fill("NewPassword1");
  // click the login button
  await page.getByRole("button", { name: "Log In" }).click();
  // assert the nav bar contains options for Search, Add Recipe, and Log Out (i.e., the user is logged in)
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
