/**
 * Creates a typed popup
 * @param {'info'|'warning'|'error'} type - Popup type (affects border color)
 * @param {string} message - Description for popup
 * @returns {HTMLDivElement} Popup as a `<div>`
 */
function createPopup(type, message) {
  const div = document.createElement('div');
  div.classList.add(type, 'popup');
  div.textContent = message;
  return div;
}

export default createPopup;
