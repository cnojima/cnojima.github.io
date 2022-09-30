import { catchErr } from "../helpers/utils.js";
import { initData } from "../stubs/data.js";

export async function init(adapter) {
  console.log('[init] start');
  // init
  let outputText = document.getElementById('initOutput');
  outputText.innerHTML = "";

  const startTime = Date.now();
  console.log("initData=> ", initData);

  await adapter.init(initData).then((response) => {
    if (!Object.keys(response).length) {
      outputText.innerHTML += "init() Success!!!!\n";
    } else {
      outputText.innerHTML += JSON.stringify(result, undefined, 4);
    }

    console.log('Init Response Data', JSON.stringify(response));
    return response;
  }).catch(catchErr);

  const endTime = Date.now();
  console.log(`[init] ttaken: ${(endTime - startTime)}ms`);
}
