/**
 * Creates a row of data (wrapped an `<a>` tag).
 * @param {...HTMLDivElement} cells - Cell elements
 * @returns {HTMLAnchorElement} Row of data wrapped by
 * `<a>` tag
 */
function createRow(...cells) {
  const wrapper = document.createElement('a');
  wrapper.classList.add('hoverable', 'row', 'before-target');
  cells.forEach(cell => wrapper.appendChild(cell));
  return wrapper;
}

export default createRow;
