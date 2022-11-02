export function shortcutDefinition(text) {
  return `<p class='shortcut'>${text}</p>`;
}

export function isDesktop() {
  if (!CSS) {
    return true; // default to true if too old browsers to make reliable detection
  }

  if (!CSS.supports('pointer', 'fine')) {
    return true; // default to true if too old browsers to make reliable detection
  }

  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
