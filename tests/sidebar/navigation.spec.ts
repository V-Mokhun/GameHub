import test, { expect } from "@playwright/test";
import { signIn } from "../lib/auth";

test.describe("Sidebar Navigation", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("All links work", async ({ page }) => {
    await signIn(page);
    await page.waitForURL("/");

    await page.locator("li a", { has: page.getByText("Browse") }).click();
    await page.waitForURL("/browse");
    await expect(page.getByText("Browse Games")).toBeVisible();
  });
});
