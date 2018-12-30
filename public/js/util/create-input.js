import createDirectory from '/js/util/create-directory.js';

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
    const PATH_TO_NEW_FOLDER = window.location.pathname + folderName;
      
    // Send a request to the server to create a new directory
    createDirectory(PATH_TO_NEW_FOLDER)
      .then(({ status, json }) => {
        if (json.isSuccessful && status === 201) {
          // Handle successful folder creation
          const noFileParagraphElement = document.getElementById('no-files');
          const wrapperRow = this.parentElement.parentElement;
          const cellDate = wrapperRow.children[3];

          wrapperRow.href = PATH_TO_NEW_FOLDER;
          cellDate.appendChild(
            document.createTextNode(
              new Date(json.mtime).toString()
            )
          );

          // Swap element <input> for TextNode
          this.parentElement.appendChild(document.createTextNode(folderName));
          this.remove();
    
          // Check if there are no files in the current directory
          if (noFileParagraphElement) noFileParagraphElement.remove();
        } else if (
          !json.isSuccessful
            && (status === 400 || status === 409)
        ) {
          console.log(json);
          this.focus();
          this.select();
        }
      })
      .catch(console.error);
  });

  return input;
}

export default createInput;
