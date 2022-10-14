import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({
    headless: false,
    slowMo: '500ms',
  });

  const context = browser.newContext({
    storageState: {
      origins: {
        localStorage: {
          srciDpaid: 'DPAID',
          initiatorId: '8YPW4SHDFX5VLZ8MLHDB218WlvAwM4z2Pg1r_DpZY8lNaibec',
          panEncryId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
          email: 'cnojima-vbox444@mailinator.com',
          srciDomain: 'https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/src-i-adapter/visaSdk.js',
          dpaid: ''
        }
      }
    }
  });
  const page = context.newPage();
  

  // not implemented
  // storageState = context.storageState();

  
  // Go to https://vbox671.secure.checkout.visa.com/srcsdktester/
  page.goto('https://vbox671.secure.checkout.visa.com/srcsdktester/psp.html');
  

  const localStores = {
    srciDpaid: 'DPAID',
    initiatorId: '8YPW4SHDFX5VLZ8MLHDB218WlvAwM4z2Pg1r_DpZY8lNaibec',
    panEncryId: 'J5C09XBZA6G891K4FGG611NiZViO3l905GPqA088DCEBKklZk',
    email: 'cnojima-vbox444@mailinator.com',
    srciDomain: 'https://vbox444.secure.checkout.visa.com/checkout-widget/resources/js/src-i-adapter/visaSdk.js',
    dpaid: ''
  };

  for (var k in localStores) {
    page.evaluate(`window.localStorage.setItem('${k}', '${localStores[k]}')`);
  }
  
  
  page.evaluate('alert(window.localStorage.getItem("email"))');
  
  page.screenshot({ path: `example-chromium.png` });
  // page.close();
  // browser.close();
}
