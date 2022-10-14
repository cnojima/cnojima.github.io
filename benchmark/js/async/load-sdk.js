import { resetUi } from '../ui/reset-ui.js';
import { setEmailErrorMessage } from '../helpers/email.js';
import { gel, catchErr } from '../helpers/utils.js';
import { autoFillUUID } from '../helpers/uuid.js';
import { benchmark, benchmarkState } from '../stubs/data.js';
import { authFlow } from './auth-flow.js';
import { checkout } from './checkout.js';
import { getSrcProfile } from './get-src-profile.js';
import { init } from './init.js';
import { isRecognized } from './is-recognized.js';
import { unbind } from './unbind.js';

const run = (val, handler) => {
  const loadStart = Date.now();
  let tag = gel('sdk_script');

  if (!tag) {
    tag = document.createElement("script");
    tag.type = 'text/javascript';
    tag.async = false;
    tag.onload = () => {
      handler(loadStart).catch(err => {
        gel('error_log').innerHTML = err;
      });
    }
  }

  tag.src = val;

  const head = document.getElementsByTagName("head")[0];
  (head || document.body).appendChild(tag);
}

const updateBenchmarks = () => gel('benchmark_data').value = JSON.stringify(benchmark, null, 2);


export const loadSdk = function() {
  resetUi();

  const val = this.value;
  const key = this.options[this.selectedIndex].innerHTML.trim();

  if (val) {
    benchmarkState.sdkUrl = val;
  
    run(val, async (loadStart) => {
      let accessToken;
      let token;
      let consumerPresent;
  
      autoFillUUID(key);
  
      // Default selection: Visa is the SRC-i
      const vcoAdapter = window.vAdapters.VisaSRCI;
      const adapter = new vcoAdapter();
      
      // init
      await init(adapter, loadStart).catch(catchErr);
      updateBenchmarks();
      
      // isRecognized
      accessToken = await isRecognized(adapter).catch(catchErr);;
      updateBenchmarks();
  
      // identity flow
      if (!accessToken) {
        consumerPresent = await authFlow(adapter).catch(catchErr);;
        updateBenchmarks();
      }
      
      if (accessToken ||
        (consumerPresent && consumerPresent.idToken)
      ) {
        token = accessToken || consumerPresent?.idToken
        // getSrcProfile
        const srcProfiles = await getSrcProfile(adapter, token).catch(catchErr);;
        updateBenchmarks();
  
        // checkout
        if (srcProfiles) {
          const checkoutSuccess = await checkout(adapter, srcProfiles).catch(catchErr);;

          if (!checkoutSuccess || checkoutSuccess.error) {
            console.error(`checkout error detected: `, checkoutSuccess);
            throw new Error(JSON.stringify(checkoutSuccess));
          } else {
            updateBenchmarks();
          }
  
          if (checkoutSuccess && checkoutSuccess.unbindAppInstance) {
            await unbind(adapter, checkoutSuccess).catch(catchErr);;
          }
        } else {
          console.warn(`intentPayload not correct`);
        }
      } else {
        catchErr('Email was not found on this instance.  Check value.');
      }
      
      gel('critical_apis').innerHTML = `Critical API timings: ${(benchmark.init + benchmark.isRecognized + benchmark.getSrcProfile) / 1000}s`;
      gel('checkout_apis').innerHTML = `Checkout API timings: ${(benchmark.checkout + benchmark.unbind) / 1000}s`;
      updateBenchmarks();

      gel('done').innerHTML = 'done';
    })
  }
};

gel('go_v1').onclick = () => {
  loadSdk.call(gel('sdk_picker_v1'));
};
gel('go_v2').onclick = () => {
  loadSdk.call(gel('sdk_picker_v2'));
};
gel('go_v3').onclick = () => {
  loadSdk.call(gel('sdk_picker_v3'));
};
