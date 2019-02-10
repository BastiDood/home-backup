import createDirectory from '/js/util/api/create-directory.js';

/**
 * Creates an `<input>` tag.
 * @param {string} placeholder - Placeholder for the `<input>` element
 * @returns {HTMLInputElement} Resulting `<input>` element
 */
function createInput(placeholder) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;

  input.addEventListener('keyup', function(event) {
    if (
      event.key === 'Enter'
      || event.key === 'Escape'
    ) this.blur();
  });
  input.addEventListener('blur', function() {
    const folderName = (this.value === '') ? this.placeholder : this.value;
    const PATH_TO_NEW_FOLDER = window.location.pathname + encodeURIComponent(folderName);

    // DOM structure
    /** @type {HTMLDivElement} */
    const wrapperCell = (this.parentElement);
    /** @type {HTMLAnchorElement} */
    const wrapperRow = (wrapperCell.parentElement);
    /** @type {HTMLDivElement} */
    const cellDate = (wrapperRow.children[3]);
    /** @type {HTMLParagraphElement} */
    const noFileParagraphElement = (document.getElementById('no-files'));
    /** @type {HTMLDivElement} */
    const popup = (document.getElementById('popup'));

    // Reset `invalid` class
    this.classList.remove('invalid');
    popup.classList.remove('visible');

    // Send a request to the server to create a new directory
    createDirectory(PATH_TO_NEW_FOLDER)
      .then(({ status, json }) => {
        if (json.isSuccessful && status === 201) {
          // Check if there are no files in the current directory
          if (noFileParagraphElement) noFileParagraphElement.remove();

          // Handle successful folder creation
          // Add `href` to file entry
          wrapperRow.href = decodeURIComponent(PATH_TO_NEW_FOLDER);
          
          // Include date in appropriate column
          cellDate.appendChild(
            document.createTextNode(
              json.mtime
            )
          );

          // Swap `<input>` for TextNode
          this.replaceWith(document.createTextNode(`${folderName}/`));
        } else if (
          !json.isSuccessful
          && (status === 400 || status === 409)
        ) {
          // Put focus on `<input>` if bad input
          this.focus();
          this.select();

          // Render as invalid
          this.classList.add('invalid');
          popup.classList.add('visible', 'error');
          popup.textContent = 'Invalid folder name.';
        }
      });
  });

  return input;
}

export default createInput;
