import {
  FETCH_MOVIES_INITIATED,
  FETCH_MOVIES_FAILED,
  FETCH_MOVIES_SUCCEEDED,
  SEARCH_QUERY_SUBMITTED,
} from "../actions/types";

const INITIAL_STATE = {
  movies: [],
  submittedQuery: "",
  isError: false,
  isLoading: false,
  maxPages: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MOVIES_INITIATED:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case FETCH_MOVIES_FAILED:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    case FETCH_MOVIES_SUCCEEDED:
      return {
        ...state,
        movies: action.payload.results,
        isError: false,
        isLoading: false,
        maxPages: action.payload.total_pages,
      };

    case SEARCH_QUERY_SUBMITTED:
      return {
        ...state,
        submittedQuery: action.payload,
      };

    default:
      return state;
  }
};
