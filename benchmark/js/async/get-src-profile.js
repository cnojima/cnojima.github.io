
import { gel } from "../helpers/utils.js";
import { benchmark, intentPayload, srcProfiles } from "../stubs/data.js";

export async function getSrcProfile(adapter, authToken) {
  console.log('[getSrcProfile] start');

  const startTime = Date.now();
  const response = await adapter.getSrcProfile(authToken);
  const endTime = Date.now();

  benchmark.getSrcProfile = endTime - startTime;
  console.log(`[getSrcProfile] ttaken: ${(benchmark.getSrcProfile)}ms`);

  // console.log('Response from getSrcProfile call: %o', response);
    
  if (response.error) {
    throw new Error(JSON.stringify(response, null, 2));
  } else if (response['reason']) {
    console.warn('Unable to get card list: %o', response);
    throw new Error(JSON.stringify(response, null, 2));
  } else {
    gel('get_src_profile_complete').checked = true;
    gel('get_src_profile_complete_timing').innerHTML = `${(benchmark.getSrcProfile)}ms`;
  }
  
  response.profiles.forEach(profile => srcProfiles.push(profile));

  // set first card
  intentPayload.srcDigitalCardId = srcProfiles[0].maskedCards[0].srcDigitalCardId;
  intentPayload.idToken = srcProfiles[0].idToken;
  intentPayload.srcCorrelationId = response.srcCorrelationId;
  intentPayload.srcDigitalCardId = srcProfiles[0].maskedCards[0].srcDigitalCardId;

  return intentPayload;
}
