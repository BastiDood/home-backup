// MODULE IMPORTS
import createCell from '/js/util/dom/create-cell.js';
import createInput from '/js/util/dom/create-input.js';
import createRow from '/js/util/dom/create-row.js';

document.addEventListener('DOMContentLoaded', () => {
  // <form></form>
  const form = document.getElementById('fsControl');

  // <input type="file" />
  const filesUpload = document.getElementById('filesUpload');

  // <label for="filesUpload"></label>
  const newFolderButton = document.getElementById('newFolder');

  // Submit the file as soon as the user selects
  filesUpload.addEventListener('change', function() {
    if (this.files.length) form.submit();
  });

  // Create a new folder on click
  newFolderButton.addEventListener('click', () => {
    const tableTarget = document.getElementById('table-target');
    const beforeTarget = document.getElementsByClassName('before-target')[0];

    // <div> cell with input
    const input = createInput('New Folder');
    const cellTextWithInput = createCell('', 'text');
    cellTextWithInput.appendChild(input);

    // Wrapper <div> cells
    const cellText = createCell('Folder', 'text');
    const cellNumber = createCell('', 'number');
    const cellSize = cellNumber.cloneNode();
    const cellDate = cellNumber.cloneNode();

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
