const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://vbox671.secure.checkout.visa.com/srcsdktester/');
  await page.locator('#domain').fill('https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/src-i-adapter/visa-sdk.js');
  await page.locator('#initiator').fill('8YPW4SHDFX5VLZ8MLHDB218WlvAwM4z2Pg1r_DpZY8lNaibec');
  await page.locator('#panEncrytionId').fill('J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk');
  await page.locator('#email').fill('divya.vbox444@mailinator.com');
  await page.locator('#loadPspBtn').click();
  
  await page.waitForURL('https://vbox671.secure.checkout.visa.com/srcsdktester/psp.html');
  await page.locator('#callInit').click();
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/checkout-widget/sdk-loader?isSRCBranded=true');
  await page.locator('#callIsReg').click();
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/apn/vdcp-web/oauth2/token/idproof/promise/recognize');
  await page.locator('b').nth(1).click();
  await page.locator('#callIdLookup').click();
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/apn/vdcp-web/oauth2/token/idproof/promise/idLookup');
  await page.locator('#callInitIdValidation').click();
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/apn/vdcp-web/oauth2/token/probe/reissuance');
  await page.locator('#getotp').click();
  await page.waitForResponse('https://vbox671.secure.checkout.visa.com/srcsdktester/generateOtp')
  await page.locator('#callCompleteIdValidation').click();
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/apn/vdcp-web/oauth2/token/probe');
  // getSrcProfile
  console.log('getSrcProfile click()');
  await page.locator('#callGetCustProfile').click();
  console.log('waiting for /intent');
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/wallet-services-web/xo/account/ARMGUID/intent?*');
  console.log('waiting for /spawn');
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/apn/vdcp-web/oauth2/token/spawn');
  
  await page.locator('#CardList').selectOption({ index: 1 });
  await page.locator('#fillSelectCardInfoButton.goButton').click();
  
  await page.locator('#callSelectCard').click();
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/wallet-services-web/xo/intent/*')
  await page.waitForResponse('https://vbox444.secure.checkout.visa.com/wallet-services-web/xo/account/ARMGUID/intent');


  // Click input[name="code"]
  await page.frameLocator('#vcop-dcf').locator('input[name="code"]').click();

  // Fill input[name="code"]
  await page.frameLocator('#vcop-dcf').locator('input[name="code"]').fill('999');

  // Click text=Confirm
  await page.frameLocator('#vcop-dcf').locator('text=Confirm').click();

  // Click text=CALL unbindAppInstance()
  await page.locator('text=CALL unbindAppInstance()').click();

  // ---------------------
  // await context.close();
  // await browser.close();
})();
