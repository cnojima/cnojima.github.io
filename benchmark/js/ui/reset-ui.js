import { gel } from "../helpers/utils.js"


const targets = [
  'init_complete', 'is_recognized_complete', 'get_src_profile_complete', 'checkout_complete', 'unbind_complete'
]

export const resetUi = () => {
  targets.forEach(id => {
    gel(id).checked = false;
    gel(`${id}_timing`).innerHTML = '';
  });

  gel('critical_apis').innerHTML = '';
  gel('checkout_apis').innerHTML = '';
}
