/** @type {HTMLDivElement} */
const popupElement = (document.getElementById('popup'));

/** Utility object for popup manipulation */
class PopupUtil {
  /**
   * @param {HTMLDivElement} popup - Popup DOM element
   */
  constructor(popup) {
    this.popup = popup;
  }
  /**
   * Sets the mode and description of popup
   * @param {'info'|'warning'|'error'} newMode - Respective mode/type of popup (affects color)
   * @param {string} message - Popup description
   * @returns {PopupUtil} Chainable object for Builder Pattern
   */
  setMode(newMode, message) {
    const { popup } = this;
    const modes = /info|warning|error/;
    const oldMode = modes.exec(popup.className)[0];
    popup.textContent = message;
    popup.classList.replace(oldMode, newMode);
    return this;
  }
  /**
   * Sets the visibility of the popup
   * @param {boolean} isVisible - Set visibility
   * @returns {PopupUtil} Chainable object for Builder Pattern
   */
  setVisibility(isVisible) {
    const { popup } = this;
    const visible = 'visible';
    if (isVisible) popup.classList.add(visible);
    else popup.classList.remove(visible);
    return this;
  }
}

export default new PopupUtil(popupElement);
