/**
 * Creates a single cell of data.
 * @param {string} [text=''] - Text to be inserted as a text node
 * @param {string} type - CSS class to apply (either `text`
 * or `number` only)
 * @param {boolean} [hasTextInput=false] - Whether or not to include an <input> tag inside the resulting cell
 * @returns {HTMLDivElement} The resulting cell element
 */
function createCell(text = '', type, hasTextInput = false) {
  const textNode = document.createTextNode(text);
  const cell = document.createElement('div');
  cell.classList.add('cell', type);
  cell.appendChild(textNode);

  if (hasTextInput) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'New Folder';
    cell.appendChild(input);
  }

  return cell;
}

export default createCell;
