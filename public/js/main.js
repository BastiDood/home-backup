// UTILITY FUNCTIONS
import createCell from '/js/util/dom/create-cell.js';
import createInput from '/js/util/dom/create-input.js';
import createRow from '/js/util/dom/create-row.js';
import popup from '/js/util/dom/popup.js';
import validateFileSizes from '/js/util/validation/validate-file-sizes.js';

document.addEventListener('DOMContentLoaded', () => {
  // <form></form>
  /** @type {HTMLFormElement} */
  const form = (document.getElementById('fsControl'));

  // <input type="file" />
  /** @type {HTMLInputElement} */
  const filesUpload =  (document.getElementById('filesUpload'));

  // <label for="filesUpload"></label>
  const newFolderButton = document.getElementById('newFolder');

  // Submit the file as soon as the user selects
  filesUpload.addEventListener('change', function() {
    const hasValidFileSizes = validateFileSizes(
      Array.from(this.files)
    );

    // Reset popup
    popup.setVisibility(false);

    if (hasValidFileSizes) form.submit();
    else {
      form.reset();
      popup
        .setMode(
          'error',
          'The total file size is too large. Consider uploading less than 1GB at a time.'
        )
        .setVisibility(true);
    }
  });

  // Create a new folder on click
  newFolderButton.addEventListener('click', () => {
    const tableTarget = document.getElementById('table-target');
    const beforeTarget = document.getElementsByClassName('before-target')[0];

    // `<div>` cell with `<input>`
    const input = createInput('New Folder');
    const cellTextWithInput = createCell('', 'text');
    cellTextWithInput.appendChild(input);

    // Wrapper <div> cells
    const cellText = createCell('Folder', 'text');
    const cellSize = createCell('', 'number');
    const cellDate = createCell('', 'number');

    // Wrapper <a> row
    const wrapperRow = createRow(
      cellTextWithInput,
      cellText,
      cellSize,
      cellDate
    );

    // Insert <input> before directories
    tableTarget.insertBefore(wrapperRow, beforeTarget);

    // Put focus on <input>
    input.focus();
  });
});
