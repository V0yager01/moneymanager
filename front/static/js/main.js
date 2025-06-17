import { rerender, rerenderPostForm, rerenderUpdateForm} from './render.js';
import { registerEventListeners } from './events.js';

window.addEventListener('DOMContentLoaded', async () => {
  registerEventListeners();
  await rerender();
  await rerenderPostForm();
});
