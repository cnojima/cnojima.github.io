import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({
    headless: false,
    slowMo: '500ms',
  });

  const context = browser.newContext();
  const page = context.newPage();
  page.goto('https://secure.checkout.visa.com/');
  page.screenshot({ path: `example-chromium.png` });

  page.close();
  browser.close();
}
