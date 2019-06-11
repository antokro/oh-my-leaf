export function setLocal(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getLocal(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function getData(path) {
  return fetch(`/${path}`).then(res => res.json());
}

export function postListing(listing) {
  const {
    title,
    description,
    type,
    swap_tags,
    user_id,
    img_path,
    price,
    createdAt
  } = listing;
  return fetch('/listing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      swap_tags,
      type,
      user_id,
      img_path,
      price,
      createdAt
    })
  }).then(res => res.json());
}
