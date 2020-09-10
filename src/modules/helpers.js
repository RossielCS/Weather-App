import closeButton from '../assets/images/close_window.png';

const message = {
  '01': 'Fill in required field.',
  '02': 'The city provided could not be found.',
};

const creator = (parent, newElement, position) => {
  const child = document.createElement(`${newElement}`);
  if (position === 'append') {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, position);
  }
  return child;
};

const addCBToModalBtn = (button, modalWindow) => {
  button.addEventListener('click', () => {
    modalWindow.remove();
  });
};

const createModal = (main, option, message) => {
  const modalWindow = creator(main, 'div', 'append');
  modalWindow.setAttribute('class', 'modal');
  modalWindow.setAttribute('id', 'error-msg');

  const modal = creator(modalWindow, 'div', 'append');
  modal.setAttribute('class', 'modal-content');

  const closeWinBtn = creator(modal, 'div', 'append');
  closeWinBtn.setAttribute('id', 'close-window');
  closeWinBtn.style.backgroundImage = `url('${closeButton}')`;
  addCBToModalBtn(closeWinBtn, modalWindow);

  const text = creator(modal, 'h3', 'append');
  text.innerHTML = `${message[option]}`;

  return modalWindow;
};

const setModalDisplay = modal => {
  modal.style.display = 'block';
};

export {
  creator, createModal, setModalDisplay, message,
};