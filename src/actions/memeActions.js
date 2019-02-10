export const CHANGE_MEME = 'CHANGE_MEME';
export const IS_SEARCHING = 'IS_SEARCHING';
export const CHANGE_QUERY = 'CHANGE_QUERY';

export function changeMeme(id) {
  return {
    type: CHANGE_MEME,
    id
  }
}

export function isSearching(searchingHuh) {
  return {
    type: IS_SEARCHING,
    searchingHuh
  }
}

export function changeQuery(query) {
  return {
    type: CHANGE_QUERY,
    query
  }
}