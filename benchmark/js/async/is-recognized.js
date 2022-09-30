import { catchErr, gel } from "../helpers/utils.js";
import { benchmark } from "../stubs/data.js";

export async function isRecognized(adapter) {
  console.log('[recognize] start');
  const startTime = Date.now();
  
  let token;
  const ret = await adapter.isRecognized().catch(catchErr);
  const endTime = Date.now();

  benchmark.isRecognized = endTime - startTime;

  gel('is_recognized_complete').checked = true;
  gel('is_recognized_complete_timing').innerHTML = `${benchmark.isRecognized}ms`;

  if (ret.idTokens) {
    token = ret.idTokens[0];
  } else {
    gel('is_recognized_complete_timing').innerHTML = `${benchmark.isRecognized}ms (unrecognized)`;
  }

  console.log(`[recognized] ttaken: ${(benchmark.isRecognized)}ms`);
  return token;
}
