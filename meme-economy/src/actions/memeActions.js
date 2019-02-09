export const CHANGE_MEME = 'CHANGE_MEME';
export const CHANGE_SITE = 'CHANGE_SITE';

export function changeMeme(id) {
  return {
    type: CHANGE_MEME,
    id
  }
}