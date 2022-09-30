import { intentPayload } from '../stubs/data.js';

export const injectComplianceSettings = () => {
  const terms = {
    complianceType: "TERMS_AND_CONDITIONS",
    uri: "usa.visa.com/legal/checkout/terms-of-service.html",
  };
  const privacy = {
    complianceType: "PRIVACY_POLICY",
    uri: "usa.visa.com/legal/global-privacy-notice.html",
  };
  const remember = {
    complianceType: "REMEMBER_ME",
    uri: "visa.checkout.com/privacy",
  };

  intentPayload.complianceSettings = {
    complianceResources: [terms, privacy, remember]
  };
}

export const removeComplianceSettings = () => {
  delete intentPayload.complianceSettings;
}
