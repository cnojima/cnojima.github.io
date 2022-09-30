import { catchErr, gel } from "../helpers/utils.js";

export async function isRecognized(adapter) {
  console.log('[recognize] start');
  const startTime = Date.now();
  
  let token;
  const ret = await adapter.isRecognized().catch(catchErr);

  if (ret.idTokens) {
    token = ret.idTokens[0];
    gel('getCustProfileInput').value = ret.idTokens[0];
  } else {
    gel('isRegOutput').innerHTML = JSON.stringify(ret, null, 2);
  }

  const endTime = Date.now();
  console.log(`[recognized] ttaken: ${(endTime - startTime)}ms`);
  return token;
}
