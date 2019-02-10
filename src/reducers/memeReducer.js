import { CHANGE_MEME, IS_SEARCHING, CHANGE_QUERY } from '../actions';

const initialState = {
  memeId: null,
  isSearching: false,
  query: '',
  queryText: ''
}

function memeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MEME:
      return {
        ...state,
        memeId: action.id
      }
    case IS_SEARCHING:
      return {
        ...state,
        isSearching: action.searchingHuh
      }
    case CHANGE_QUERY:
      return {
        ...state,
        query: action.query,
        queryText: action.queryText
      }
    default:
      return state;
  }
}

export default memeReducer;