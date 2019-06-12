export function setLocal(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getLocal(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function getData(path) {
  return fetch(`/${path}`).then(res => res.json());
}

export function getFavouritesByUserId(id) {
  return fetch(`/users/${id}`).then(res => res.json());
}

export function toggleFavourites(user_id, listing_id) {
  return fetch(`/users/${user_id}/favourites`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      listing_id
    })
  }).then(res => res.json());
}

export function postListing(listing) {
  const {
    title,
    description,
    type,
    swap_tags,
    user_id,
    img_path,
    price
  } = listing;
  return fetch('/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      swap_tags,
      type,
      user_id,
      img_path,
      price
    })
  }).then(res => res.json());
}

export function getListingsByUserId(user_id) {
  return fetch(`/users/${user_id}/listings`).then(res => res.json());
}
