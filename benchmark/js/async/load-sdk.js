import { resetUi } from '../ui/reset-ui.js';
import { gel } from '../helpers/utils.js';
import { autoFillUUID } from '../helpers/uuid.js';
import { benchmark, benchmarkState } from '../stubs/data.js';
import { authFlow } from './auth-flow.js';
import { checkout } from './checkout.js';
import { getSrcProfile } from './get-src-profile.js';
import { init } from './init.js';
import { isRecognized } from './is-recognized.js';
import { unbind } from './unbind.js';

const run = (val, handler) => {
  let tag = gel('sdk_script');

  if (!tag) {
    tag = document.createElement("script");
    tag.type = 'text/javascript';
    tag.async = false;
    tag.onload = () => {
      handler();
    }
  }

  tag.src = val;

  const head = document.getElementsByTagName("head")[0];
  (head || document.body).appendChild(tag);
}

export const loadSdk = function() {
  resetUi();

  const val = this.value;
  const key = this.options[this.selectedIndex].innerHTML.trim();

  benchmarkState.sdkUrl = val;

  run(val, async () => {
    let authToken;
    let consumerPresent;

    autoFillUUID(key);

    // Default selection: Visa is the SRC-i
    const vcoAdapter = window.vAdapters.VisaSRCI;
    const adapter = new vcoAdapter();
    
    // init
    await init(adapter);
    
    // isRecognized
    authToken = await isRecognized(adapter);

    // identity flow
    if (!authToken) {
      consumerPresent = await authFlow(adapter);
    }

    if (consumerPresent && consumerPresent.idToken) {
      // getSrcProfile
      const srcProfiles = await getSrcProfile(adapter, consumerPresent.idToken);

      // checkout
      if (srcProfiles) {
        const checkoutSuccess = await checkout(adapter, srcProfiles);

        if (checkoutSuccess && checkoutSuccess.unbindAppInstance) {
          await unbind(adapter);

          gel('critical_apis').innerHTML = `Critical API timings: ${(benchmark.init + benchmark.isRecognized + benchmark.getSrcProfile) / 1000}s`;
          gel('checkout_apis').innerHTML = `Checkout API timings: ${(benchmark.checkout + benchmark.unbind) / 1000}s`;
        }
      } else {
        console.warn(`intentPayload not correct`);
      }
    } else {
      alert('email ID invalid for environment');
    }
  });
};

gel('sdk_picker_v1').onchange = loadSdk;
gel('sdk_picker_v2').onchange = loadSdk;
