'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fsControl');
  const filesInput = document.getElementById('filesUpload');

  filesInput.addEventListener('change', () => {
    form.submit();
  });
});
