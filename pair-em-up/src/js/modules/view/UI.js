class UI {
  createEl(tag, className = null, text = null, src = null) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    if (src) el.src = src;

    return el;
  }

  clearContainer(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

export default new UI();
