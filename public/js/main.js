// MODULE IMPORTS
import createCell from '/js/util/dom/create-cell.js';
import createInput from '/js/util/dom/create-input.js';
import createRow from '/js/util/dom/create-row.js';

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
    const files = Array.from(this.files);
    const totalSize = files
      .reduce((prev, curr) => prev + curr.size, 0);
    if (files.length && totalSize <= 1e9) form.submit();
    else {
      window.alert('File too large.');
      form.reset();
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
