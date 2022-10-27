import { chromium } from 'k6/x/browser';

export default function() {
  const browser = chromium.launch({
    headless: false
  });
  const context = browser.newContext();
  // Open new page
  const page = context.newPage();
  // Go to https://vbox671.secure.checkout.visa.com/srcsdktester/
  page.goto('https://vbox671.secure.checkout.visa.com/srcsdktester/');
  
  page.locator('#domain').fill('https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/src-i-adapter/visa-sdk.js');
  page.locator('#initiator').fill('8YPW4SHDFX5VLZ8MLHDB218WlvAwM4z2Pg1r_DpZY8lNaibec');
  page.locator('#panEncrytionId').fill('J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk');
  page.locator('#email').fill('divya.vbox444@mailinator.com');

  // Click text=LOAD PSP
  page.locator('#loadPspBtn').click();




  page.goto('https://vbox671.secure.checkout.visa.com/srcsdktester/psp.html');
  page.locator('#callInit').click();
  page.locator('#callIsReg').click();
  page.locator('summary').click();
  page.locator('#callIdLookup').click();
  page.locator('#callInitIdValidation').click();
  page.locator('#getotp').click();
  page.locator('#callCompleteIdValidation').click();
  page.locator('#callGetCustProfile').click();
  page.locator('# 9392858724259194 Launch DCF in SRC-i popup window Launch DCF in SRC- >> select').selectOption('9392');
  // Click # Card
  page.locator('# CardList').click();
  // Click #()
  page.locator('#()').click();
  // ---------------------
  context.close();
  browser.close();
}
