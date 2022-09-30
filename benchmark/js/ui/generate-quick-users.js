import { gel } from '../helpers/utils.js';
import { usersInfo } from "./user-info.js";

const target = gel('pregen');

export const generateQuickUsers = () => {
  usersInfo.forEach(profile => {
    const button = document.createElement('button');
    button.value = profile.title;
    button.onclick = alert('click')

    target.appendChild(button);
  });
}
