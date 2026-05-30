class UI {
  createEl(tag, className = null, text = null, src = null, id = null) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text || text === 0 || text === '') el.textContent = text;
    if (src) el.src = src;
    if (id) el.id = id;

    return el;
  }

  clearContainer(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

export default new UI();
