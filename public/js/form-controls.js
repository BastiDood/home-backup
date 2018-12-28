'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fsControl');
  const filesUpload = document.getElementById('filesUpload');
  const newFolderButton = document.getElementById('newFolder');

  // Submit the file as soon as the user selects
  filesUpload.addEventListener('change', function() {
    if (!this.length) form.submit();
  });

  // Create a new folder on click
  newFolderButton.addEventListener('click', () => {
    const tableTarget = document.getElementById('table-target');
    const beforeTarget = document.getElementsByClassName('before-target')[0];

    // Wrapper <div> cells
    const text = document.createTextNode('Folder');
    const cell = document.createElement('div');
    cell.classList.add('cell');
    const cellText = cell.cloneNode();
    cellText.classList.add('text');
    cellText.appendChild(text);
    const cellNumber = cell.cloneNode();
    cellNumber.classList.add('number');

    // <div> cell with input
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'New Folder';
    const cellWithInput = cell.cloneNode();
    cellWithInput.appendChild(input);

    // Wrapper <a> row
    const wrapperRow = document.createElement('a');
    wrapperRow.classList.add('hoverable', 'row', 'before-target');
    wrapperRow.appendChild(cellWithInput);
    wrapperRow.appendChild(cellText);
    wrapperRow.appendChild(cellNumber.cloneNode());
    wrapperRow.appendChild(cellNumber.cloneNode());

    // Insert <input> before directories
    tableTarget.insertBefore(wrapperRow, beforeTarget);

    // Put focus on <input>
    input.focus();
  });
});
