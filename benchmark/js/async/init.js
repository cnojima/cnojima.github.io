import { catchErr, gel } from "../helpers/utils.js";
import { benchmark, initData } from "../stubs/data.js";

export async function init(adapter, startTime) {
  console.log('[init] start');

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
