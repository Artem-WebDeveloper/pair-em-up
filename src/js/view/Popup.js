import ui from './UI.js';

class Popup {
  constructor() {
    this.popup = this.render();
  }

  render() {
    const popup = ui.createEl('div', 'popup');
    const container = ui.createEl('div', 'popup__content');
    const closeBtn = ui.createEl('button', 'popup__close-btn', '✖');

    container.append(closeBtn);
    popup.append(container);

    closeBtn.addEventListener('click', () => this.close());
    popup.addEventListener('click', e => {
      if (!e.target.closest('.popup__content')) this.close();
    });

    return popup;
  }

  mount(root) {
    root.append(this.popup);
  }

  open(contentNode) {
    const contentEl = this.popup.querySelector('.popup__content');
    const closeBtn = contentEl.querySelector('.popup__close-btn');
    ui.clearContainer(contentEl);
    contentEl.append(contentNode, closeBtn);
    this.popup.classList.add('popup--open');
  }

  close() {
    this.popup.classList.remove('popup--open');
  }
}

const popup = new Popup();
export default popup;
