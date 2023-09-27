import { Page } from "@playwright/test";

require("dotenv").config();

export const signIn = async (page: Page) => {
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.waitForLoadState("networkidle");
  await page
    .getByPlaceholder("Email or Username")
    .fill(process.env.TEST_USER_USERNAME!);
  await page.getByPlaceholder("Password").fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
};
