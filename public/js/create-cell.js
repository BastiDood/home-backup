function createCell(text = '', type, hasTextInput = false) {
  const textNode = document.createTextNode(text);
  const cell = document.createElement('div');
  cell.classList.add('cell', type);
  cell.appendChild(textNode);

  if (hasTextInput) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'New Folder';
    cell.appendChild(input);
  }

  return cell;
}

export default createCell;
