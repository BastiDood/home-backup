/**
 * Creates a single cell of data.
 * @param {string} [text=''] - Text to be inserted as a text node
 * @param {string} type - CSS class to apply (either `text`
 * or `number` only)
 * @param {boolean} [hasTextInput=false] - Whether or not to include an `<input>` tag inside the resulting cell
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

    input.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') this.blur();
    });
    input.addEventListener('blur', function() {
      const noFileParagraphElement = document.getElementById('no-files');
      const folderName = (this.value) ? this.value : this.placeholder;
      const folderNameTextNode = document.createTextNode(`${folderName}/`);
      const PATH_TO_NEW_FOLDER = window.location.pathname + folderName;
      
      // Send a request to the server to create a new directory
      fetch(PATH_TO_NEW_FOLDER, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mkDir: true,
          PATH_TO_NEW_FOLDER
        })
      })
        .then(res => res.json())
        .then(console.log)
        .catch(console.error);

      this.parentNode.parentNode.href = PATH_TO_NEW_FOLDER;
      this.remove();

      // Check if there are no files in the current directory
      if (noFileParagraphElement) noFileParagraphElement.remove();
      cell.appendChild(folderNameTextNode);
    });

    cell.appendChild(input);
  }

  return cell;
}

export default createCell;
