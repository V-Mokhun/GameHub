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
    await expect(
      page.getByRole("heading", { name: "Browse Games" })
    ).toBeVisible();

    await page.locator("li a", { has: page.getByText("Library") }).click();
    await expect(
      page.getByRole("heading", { name: "Your Library" })
    ).toBeVisible();

    await page.locator("li a", { has: page.getByText("Import") }).click();
    await expect(
      page.getByRole("heading", { name: "Import Games" })
    ).toBeVisible();

    await page.locator("li a", { has: page.getByText("Community") }).click();
    await expect(
      page.getByRole("heading", { name: "Our Community" })
    ).toBeVisible();

    await page
      .locator("li a", { has: page.getByText("Friends", { exact: true }) })
      .click();
    await expect(
      page.getByRole("heading", { name: "Your Friends" })
    ).toBeVisible();

    await page.locator("li a", { has: page.getByText("Messages") }).click();
    await expect(
      page.getByRole("heading", { name: "Your messages" })
    ).toBeVisible();
  });
});
