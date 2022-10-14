import { gel } from "../helpers/utils.js";
import { benchmark, intentPayload } from "../stubs/data.js";

export async function checkout(adapter) {
  console.log('[checkout] start');
  const startTime = Date.now();
  const response = await adapter.checkout(intentPayload);
  const endTime = Date.now();

  benchmark.checkout = endTime - startTime;

  console.log(`[checkout] ttaken: ${(benchmark.checkout)}ms`);
  
  if (response.error || response['reason']) {
    throw new Error(JSON.stringify(response, null, 2));
  } else {
    gel('checkout_complete').checked = true;
    gel('checkout_complete_timing').innerHTML = `${(benchmark.checkout)}ms`;
  }
  return response;
}
