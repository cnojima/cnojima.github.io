import { qsa, gel } from "../helpers/utils.js"


const targets = [
  'init_complete', 'is_recognized_complete', 'auth_complete', 'get_src_profile_complete', 'checkout_complete', 'unbind_complete'
];

export const resetUi = () => {
  targets.forEach(id => {
    gel(id).checked = false;
    gel(`${id}_timing`).innerHTML = '';
  });

  Array(qsa('.messaging')).forEach(el => {
    el.innerHTML = '';
  });

  gel('auth_breakdown').innerHTML = '';
  gel('error_log').innerHTML = '';
  gel('benchmark_data').value = '';
}
