'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fsControl');
  const filesUpload = document.getElementById('filesUpload');
  const newFolderButton = document.getElementById('newFolder');

  // Submit the file as soon as the user selects
  filesUpload.addEventListener('change', function() {
    if (!this.length) form.submit();
  });

  // Create a new folder
  newFolderButton.addEventListener('click', () => {
    const table = document.getElementsByClassName('table')[0];
    const beforeTarget = document.getElementsByClassName('before-target')[0];
    
    const input = document.createElement('input');
    input.type = 'text';

    table.insertBefore(input, beforeTarget);
  });
});