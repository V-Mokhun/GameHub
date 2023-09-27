import test, { expect } from "@playwright/test";
import { signIn } from "../lib/auth";

test.describe("User Sign Out", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Signs out user", async ({ page }) => {
    await signIn(page);
    await page.waitForURL("/");

    await expect(page.getByTestId("avatar-button-dropdown")).toBeVisible();
    await page.getByTestId("avatar-button-dropdown").click();
    await page.getByText("Sign Out").click();
    await expect(page.getByTestId("avatar-button-dropdown")).not.toBeVisible();
    await expect(page.getByRole("link", { name: "Sign In" })).toBeVisible();
  });
});
