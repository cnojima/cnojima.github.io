import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://vbox671.secure.checkout.visa.com/srcsdktester/
  await page.goto('https://vbox671.secure.checkout.visa.com/srcsdktester/');

  // Select https://sandbox.secure.checkout.visa.com/checkout-widget/resources/js/src-i-adapter/visaSdk.js
  await page.locator('text=SRC SDK PATH : -----------------------------Functional-------------------------- >> select').selectOption('https://sandbox.secure.checkout.visa.com/checkout-widget/resources/js/src-i-adapter/visaSdk.js');

  // Click #email
  await page.locator('#email').click();

  // Fill #email
  await page.locator('#email').fill('cnojima-sandbox@mailinator.com');

  // Click text=LOAD SRC-i
  await page.locator('text=LOAD SRC-i').click();
  await expect(page).toHaveURL('https://vbox671.secure.checkout.visa.com/srcsdktester/main.html');

  // Check #iframeButton
  await page.locator('#iframeButton').check();

  // Click text=CALL Init()
  await page.locator('text=CALL Init()').click();

  // Click text=CALL isRecognized()
  await page.locator('text=CALL isRecognized()').click();

  // Click b >> nth=1
  await page.locator('b').nth(1).click();

  // Click text=CALL idLookup()
  await page.locator('text=CALL idLookup()').click();

  // Click text=CALL initiateIdentityValidation()
  await page.locator('text=CALL initiateIdentityValidation()').click();

  // Click text=Get OTP
  await page.locator('text=Get OTP').click();

});
