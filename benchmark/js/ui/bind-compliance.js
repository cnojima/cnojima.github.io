import { gel } from "../helpers/utils.js";
import { injectComplianceSettings, removeComplianceSettings } from '../helpers/compliance-settings.js';
import { intentPayload } from "../stubs/data.js";

export const bindComplianceToggle = () => {
  gel('compliance_toggle').addEventListener('change', e => {
    if(e.target.checked) {
      injectComplianceSettings();
    } else {
      removeComplianceSettings();
    }

    console.log(intentPayload)
  });
}
