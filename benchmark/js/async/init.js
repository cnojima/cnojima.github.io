import { catchErr, gel } from "../helpers/utils.js";
import { benchmark, initData } from "../stubs/data.js";
import merchantApIKeys from '../helpers/merchantApiKeys.js';

export async function init(adapter, key, startTime) {
  console.log('[init] start');
  
  // overload apikey for qa.perf
  const genericKey = key.replace(/SDKv[0-9].*$/i, '').trim();
  const apikey = merchantApIKeys?.[genericKey];

  if (apikey) {
    initData.apikey = apikey;
  }


  await adapter.init(initData).then((response) => {
    const endTime = Date.now();
    benchmark.init = endTime - startTime;
    
    console.log(`[init] ttaken: ${(benchmark.init)}ms`);
    
    if (!Object.keys(response).length) {
      gel('init_complete').checked = true;
      gel('init_complete_timing').innerHTML = `${(benchmark.init)}ms`;
    } else if (response.error) {
      throw new Error(JSON.stringify(response, null, 2));
    } else {
      console.error('init failed, check console');
    }

    // console.log('Init Response Data', JSON.stringify(response));
    return response;
  }).catch(catchErr);

  
}
