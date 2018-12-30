/**
 * Creates a single cell of data.
 * @param {string} [text=''] - Text to be inserted as a text node
 * @param {string} type - CSS class to apply (either `text`
 * or `number` only)
 * @returns {HTMLDivElement} The resulting cell element
 */
function createCell(text = '', type) {
  const textNode = document.createTextNode(text);
  const cell = document.createElement('div');
  cell.classList.add('cell', type);
  cell.appendChild(textNode);
  return cell;
}

export default createCell;
