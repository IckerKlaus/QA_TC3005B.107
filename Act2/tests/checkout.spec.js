const { test, expect } = require('@playwright/test');
const { qase } = require('playwright-qase-reporter');

const qaseCaseId = Number(process.env.QASE_TEST_CASE_ID || 1);

test('Flujo completo de compra en SauceDemo', async ({ page }) => {
  qase.id(qaseCaseId);
  qase.title('Compra completa: login, carrito, checkout y confirmacion');

  await page.goto('/');

  await expect(page.locator('[data-test="login-button"]')).toBeVisible();

  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  const addToCartButton = page.locator(
    '[data-test="add-to-cart-sauce-labs-backpack"]',
  );
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  await page.click('[data-test="shopping-cart-link"]');
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.click('[data-test="checkout"]');

  await page.fill('[data-test="firstName"]', 'Icker');
  await page.fill('[data-test="lastName"]', 'Villalon');
  await page.fill('[data-test="postalCode"]', '64000');
  await page.click('[data-test="continue"]');

  await expect(page.locator('[data-test="finish"]')).toBeVisible();
  await page.click('[data-test="finish"]');

  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    'Thank you for your order!',
  );
});
