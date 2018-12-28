/**
 * Creates a row of data (wrapped an `<a>` tag).
 * @param {HTMLDivElement} nameCell - Corresponds to name
 * column (can have child `<input>`)
 * @param {HTMLDivElement} typeCell - Corresponds to type
 * column (either `'Folder'` or `'File'`)
 * @param {HTMLDivElement} sizeCell - Corresponds to file size column
 * @param {HTMLDivElement} mtimeCell - Corresponds to the last modified date column
 * @returns {HTMLAnchorElement} Row of data wrapped by
 * `<a>` tag
 */
function createRow(nameCell, typeCell, sizeCell, mtimeCell) {
  const wrapper = document.createElement('a');
  wrapper.classList.add('hoverable', 'row', 'before-target');
  wrapper.appendChild(nameCell);
  wrapper.appendChild(typeCell);
  wrapper.appendChild(sizeCell);
  wrapper.appendChild(mtimeCell);
  return wrapper;
}

export default createRow;
