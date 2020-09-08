function creator(parent, newElement, position) {
  const child = document.createElement(`${newElement}`);
  if (position === 'append') {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, position);
  }
  return child;
}

function addCBToModalBtn(button, modalWindow) {
  button.addEventListener('click', () => {
    modalWindow.style.display = 'none';
  });
}

function createModal(main) {
  const modalWindow = creator(main, 'div', 'append');
  modalWindow.setAttribute('class', 'modal');
  modalWindow.setAttribute('id', 'error-msg');

  const closeWinBtn = creator(modalWindow, 'div', 'append');
  closeWinBtn.setAttribute('id', 'close-window');
  addCBToModalBtn(closeWinBtn, modalWindow);

  const modal = creator(modalWindow, 'div', 'append');
  modal.setAttribute('class', 'modal-content');

  const message = creator(modal, 'h3', 'append');
  message.innerHTML = 'The city provided could not be found.';
  return modalWindow;
}

export { creator, createModal };