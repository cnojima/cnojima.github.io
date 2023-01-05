import { buildSdkPicker } from './ui/generate-sdk-list.js';
import { bindComplianceToggle } from './ui/bind-compliance.js';
import { loadSdk } from './async/load-sdk.js';

const gel = id => document.getElementById(id);
const lsEmail = localStorage.getItem('email');
if (lsEmail) {
  const em = gel('emailInput');
  const ev = new Event('blur');
  em.value = lsEmail;
  em.dispatchEvent(ev);
}

buildSdkPicker();
bindComplianceToggle(); // full automation - do direct to configured env.
