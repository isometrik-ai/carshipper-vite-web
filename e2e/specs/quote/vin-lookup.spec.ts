import { expect, test } from "@playwright/test";
import { validVinPayload } from "../../mocks/vin";

test.describe("VIN lookup smoke", () => {
  test("fills vehicle details for a valid VIN", async ({ page }) => {
    await page.route("**/vehicle/decode-vin", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(validVinPayload),
      });
    });

    test.setTimeout(60000);
    await page.goto("/quote");

    const vinInput = page.locator("input[placeholder='Enter 17-character VIN']:visible").first();
    await expect(vinInput).toBeVisible({ timeout: 45000 });
    await vinInput.fill("1HGCM82633A004352");

    const lookupButton = page
      .locator("div.flex.gap-2.mt-1:has(input[placeholder='Enter 17-character VIN'])")
      .getByRole("button", { name: "Lookup" })
      .first();
    await expect(lookupButton).toBeEnabled({ timeout: 10000 });
    await lookupButton.click();

    // Year field should be updated from mocked VIN response.
    const yearValue = page.locator("button[role='combobox']").first();
    await expect(yearValue).toContainText("2020");
  });
});
