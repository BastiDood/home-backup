'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fsControl');
  const filesUpload = document.getElementById('filesUpload');

  filesUpload.addEventListener('change', function() {
    if (!this.length) form.submit();
  });
});
