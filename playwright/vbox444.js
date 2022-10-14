const { chromium } = require('playwright');

(async () => {
  let i = 5;

  const doRun = async () => {
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
  
    // Open new page
    const page = await context.newPage();
  
    // Go to http://localhost/
    await page.goto('http://localhost/');
  
    // Fill [placeholder="Enter email address"]
    await page.locator('[placeholder="Enter email address"]').fill('divya.vbox444@mailinator.com');
  
    // Select https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/visa-sdk.js?integrated
    await page.locator('#sdk_picker_v2').selectOption('https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/visa-sdk.js?integrated');
  
    // Click #go_v2
    await page.locator('#go_v2').click();
  
    await setTimeout(async () => {
      // ---------------------
      await context.close();
      await browser.close();
      i--;

      if (i >= 0) {
        doRun();
      }
    }, 60000);
  }

  doRun();
  
  // // Go to http://localhost/
  // await page.goto('http://localhost/');

  // // Fill [placeholder="Enter email address"]
  // await page.locator('[placeholder="Enter email address"]').fill('divya.vbox444@mailinator.com');

  // // Select https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/visa-sdk.js?integrated
  // await page.locator('text=Visa SDK V2: --- Pick SDKv2CERT SDKv2CERT1 SDKv2ICL SDKv2SandBox SDKv2QAINT SDKv >> select').selectOption('https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/visa-sdk.js?integrated');

  // // Click #go_v2
  // await page.locator('#go_v2').click();

  // setTimeout(async () => {
  //   // ---------------------
  //   await context.close();
  //   await browser.close();
  // }, 25000);
})();
