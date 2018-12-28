// MODULE IMPORTS
import createCell from './util/create-cell.js';
import createRow from './util/create-row.js';

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
    const cellWithInput = createCell('', 'text', true);
    const input = cellWithInput.children[0];

    // Wrapper <div> cells
    const cellText = createCell('Folder', 'text');
    const cellNumber = createCell('', 'number');

    // Wrapper <a> row
    const wrapperRow = createRow(
      cellWithInput,
      cellText,
      cellNumber.cloneNode(),
      cellNumber.cloneNode()
    );

    // Insert <input> before directories
    tableTarget.insertBefore(wrapperRow, beforeTarget);

    // Put focus on <input>
    input.focus();
  });
});
