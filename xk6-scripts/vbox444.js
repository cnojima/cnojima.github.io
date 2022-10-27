// const { chromium } = require('playwright');
import { chromium } from 'k6/x/browser';

export default function () {
// (async () => {
  // let i = 500;

  // const doRun = () => {
    const browser = chromium.launch({
      headless: false
    });
    const context = browser.newContext();
  
    // Open new page
    const page = context.newPage();
  
    // Go to http://localhost/
    page.goto('http://localhost/');
  
    // Fill [placeholder="Enter email address"]
    page.locator('[placeholder="Enter email address"]').fill('divya.vbox444@mailinator.com');
  
    page.locator('#sdk_picker_v3').selectOption('https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/src-i-adapter/visa-sdk.js?v2');
    page.locator('#go_v3').click();
  
    const text = page.locator('#done');
    text.waitFor({
        state: 'visible',
    });

  
    // setTimeout( () => {
      // ---------------------
      context.close();
      browser.close();
      // i--;

      // if (i >= 0) {
      //   doRun();
      // }
    // }, 45000);
  // }

  // doRun();
  
  // // Go to http://localhost/
  // page.goto('http://localhost/');

  // // Fill [placeholder="Enter email address"]
  // page.locator('[placeholder="Enter email address"]').fill('divya.vbox444@mailinator.com');

  // // Select https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/visa-sdk.js?integrated
  // page.locator('text=Visa SDK V2: --- Pick SDKv2CERT SDKv2CERT1 SDKv2ICL SDKv2SandBox SDKv2QAINT SDKv >> select').selectOption('https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/visa-sdk.js?integrated');

  // // Click #go_v2
  // page.locator('#go_v2').click();

  // setTimeout(async () => {
  //   // ---------------------
  //   context.close();
  //   browser.close();
  // }, 25000);
// })();

};
