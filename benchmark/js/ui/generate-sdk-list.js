import { cel, gel } from '../helpers/utils.js';

const envs = {
  // "--- Pick": "",
  Vbox444_Adyen: "https://vbox444.secure.checkout.visa.com",
  SandBox: "https://sandbox.secure.checkout.visa.com",
  CERT: "https://cert.secure.checkout.visa.com",
  // CERT1: "https://cert1.secure.checkout.visa.com",
  // ICL: "https://demo.icl.visa.com",
  QAINT: "https://int.qa.secure.checkout.visa.com",
  // Vbox28: "https://vbox28.secure.checkout.visa.com",
  // Vbox441: "https://vbox441.secure.checkout.visa.com",
  // Vbox442: "https://vbox442.secure.checkout.visa.com",
  // Vbox442_Adyen: "https://vbox442.secure.checkout.visa.com",
  Vbox444_3DS: "https://vbox444.secure.checkout.visa.com",
  Vbox444_Container: "https://src-qab.k8s-np-cls1-p.trusted.visa.com",
  Vbox444_Container_DockerEE: "https://b2cp-vco-qab.k8s-np-cls1-p.trusted.visa.com",
  Vbox444_ExternalSrci: "https://vbox444.secure.checkout.visa.com",
  Vbox444_PSP: "https://vbox444.secure.checkout.visa.com",
  Vbox462: "https://vbox462.secure.checkout.visa.com",
  Vbox671: "https://vbox671.secure.checkout.visa.com",
  Vbox734: "https://vbox734.secure.checkout.visa.com",
  Vbox734_PSP: "https://vbox734.secure.checkout.visa.com",  
};


export const buildSdkPicker = () => {
  const sdkSelector = gel('sdk_picker_v1');
  const sdkSelector_v2 = gel('sdk_picker_v2');
  const sdkSelector_v2_integrated = gel('sdk_picker_v3');
  
  for (let k in envs) {
    const option = cel('option');
    option.setAttribute('value', `${envs[k]}/checkout-widget/resources/js/src-i-adapter/visaSdk.js`);
    option.innerHTML = `${k} SDKv1`;
  
    const option_v2 = cel('option');
    option_v2.setAttribute('value', `${envs[k]}/checkout-widget/resources/js/src-i-adapter/visa-sdk.js`)
    option_v2.innerHTML = `${k} SDKv2`;

    const option_v3 = cel('option');
    option_v3.setAttribute('value', `${envs[k]}/checkout-widget/resources/js/src-i-adapter/visa-sdk.js?v2`)
    option_v3.innerHTML = `${k} SDKv2 INTEGRATED`;
  
    sdkSelector.appendChild(option);
    sdkSelector_v2.appendChild(option_v2);
    sdkSelector_v2_integrated.appendChild(option_v3);
  }
}
