function isCaps(code) {
  return code === 'CapsLock';
}

function isShift(code) {
  return ['ShiftLeft', 'ShiftRight'].includes(code);
}

function isCtrl(code) {
  return ['ControlRight', 'ControlLeft'].includes(code);
}

function isArrow(code) {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code);
}

export {
  isCaps,
  isShift,
  isCtrl,
  isArrow
}