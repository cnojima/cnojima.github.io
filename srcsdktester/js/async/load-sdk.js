import { gel } from '../helpers/utils.js';
import { autoFillUUID } from '../helpers/uuid.js';
import { authFlow } from './auth-flow.js';
import { checkout } from './checkout.js';
import { getSrcProfile } from './get-src-profile.js';
import { init } from './init.js';
import { isRecognized } from './is-recognized.js';

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
  const val = this.value;
  const key = this.options[this.selectedIndex].innerHTML.trim();

  run(val, async () => {
    autoFillUUID(key);

    // Default selection: Visa is the SRC-i
    const vcoAdapter = window.vAdapters.VisaSRCI;
    const adapter = new vcoAdapter();
    
    await init(adapter);
    let authToken = await isRecognized(adapter);

    if (!authToken) {
      await authFlow(adapter);
    }
    await getSrcProfile(adapter);
    await checkout(adapter);
  });
};

gel('sdk_picker_v1').onchange = loadSdk;
gel('sdk_picker_v2').onchange = loadSdk;
