export function setLocal(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getLocal(name) {
  return JSON.parse(localStorage.getItem(name));
}
