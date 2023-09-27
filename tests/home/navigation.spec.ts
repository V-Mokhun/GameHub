import test, { expect } from "@playwright/test";

test.describe("Home Page Navigation", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Redirects to Browse Page and indicates active link", async ({
    page,
  }) => {
    await expect(
      page.locator("li a", { has: page.getByText("Home") })
    ).toHaveClass(/text-primary/);

    await expect(
      page.locator("li a", { has: page.getByText("Browse") })
    ).toHaveClass(/text-foreground/);
    await page.getByRole("link", { name: "Browse Games" }).click();

    await expect(page).toHaveURL("/browse");
    await expect(
      page.getByRole("heading", { name: "Browse Games" })
    ).toBeVisible();

    await expect(
      page.locator("li a", { has: page.getByText("Home") })
    ).toHaveClass(/text-foreground/);

    await expect(
      page.locator("li a", { has: page.getByText("Browse") })
    ).toHaveClass(/text-primary/);
  });

  test("Redirects to Game Page", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: "Featured" })).toBeVisible();

    await page
      .getByRole("link", { name: "The Legend of Zelda: Tears of the Kingdom" })
      .click();
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  });
});
