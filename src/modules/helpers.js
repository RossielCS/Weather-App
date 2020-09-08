function creator(parent, newElement, position) {
  const child = document.createElement(`${newElement}`);
  if (position === 'append') {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, position);
  }
  return child;
}

function createModal(main) {
  const modalWindow = creator(main, 'div', 'append');
  modalWindow.setAttribute('class', 'modal');
  modalWindow.setAttribute('class', 'error-msg');

  const modal = creator(modalWindow, 'div', 'append');
  modal.setAttribute('class', 'modal-content');

  const header = creator(modal, 'h3', 'append');
  header.innerHTML = 'Error';

  const message = creator(modal, 'p', 'append');
  message.innerHTML = 'The city provided could not be found.';
  return modalWindow;
}

export { creator, createModal };