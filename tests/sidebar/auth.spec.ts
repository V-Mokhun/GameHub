import test, { expect } from "@playwright/test";
import { signIn } from "../lib/auth";

test.describe("Sidebar Authorization state", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Hides Library and Friends link when not logged in", async ({
    page,
  }) => {
    await expect(page.getByText("Sign in")).toBeVisible();
    await expect(
      page.locator("li a", { has: page.getByText("Library") })
    ).not.toBeVisible();
    await expect(
      page.locator("li a", { has: page.getByText("Friends") })
    ).not.toBeVisible();
  });

  test("Shows Library and Friends link when logged in", async ({ page }) => {
    await signIn(page);

    await page.waitForURL("/");

    await expect(page.getByRole("link", { name: "Sign In" })).not.toBeVisible();
    await expect(
      page.locator("li a", { has: page.getByText("Library") })
    ).toBeVisible();
    await expect(
      page.locator("li a", { has: page.getByText("Friends") })
    ).toBeVisible();
  });

  test("Dark mode works and hides when logged in", async ({ page }) => {
    await page.locator("#sidebar-theme").click();
    await expect(page.locator("html")).toHaveClass("dark");
    await page.locator("#sidebar-theme").click();
    await expect(page.locator("html")).not.toHaveClass("dark");

    await signIn(page);
    await page.waitForURL("/");

    await expect(page.locator("#sidebar-theme")).not.toBeVisible();
  });
});
