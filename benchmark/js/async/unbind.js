import { gel } from "../helpers/utils.js";
import { benchmark } from "../stubs/data.js";

export const unbind = async (adapter, token) => {
  if (token) {
    const start = Date.now();
    const response = await adapter.unbindAppInstance({});
    const end = Date.now();
  
    benchmark.unbind = end - start;

    if (response.error) {
      throw new Error(JSON.stringify(response, null, 2));
    } else {
      gel('unbind_complete').checked = true;
      gel('unbind_complete_timing').innerHTML = `${benchmark.unbind}ms`;
    
      console.log('Unbind result received from Visa SRC System');
//      console.log('Response Data', JSON.stringify(response));
    }
  
    return response;
  }

  return;
}
