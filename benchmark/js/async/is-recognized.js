
import { catchErr, gel } from "../helpers/utils.js";
import { benchmark } from "../stubs/data.js";

export async function isRecognized(adapter) {
  console.log('[recognize] start');
  const startTime = Date.now();
  
  let token;
  const response = await adapter.isRecognized().catch(catchErr);
  const endTime = Date.now();

  benchmark.isRecognized = endTime - startTime;

  gel('is_recognized_complete').checked = true;
  gel('is_recognized_complete_timing').innerHTML = `${benchmark.isRecognized}ms`;

  if (response.idTokens) {
    token = response.idTokens[0];
  } else if (response.recognized === false) {
    gel('is_recognized_complete_timing').innerHTML = `${benchmark.isRecognized}ms (unrecognized)`;
  } else if (response.error) {
    throw new Error(JSON.stringify(response, null, 2));
  }

  console.log(`[recognized] ttaken: ${(benchmark.isRecognized)}ms`);
  return token;
}
