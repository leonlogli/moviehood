import { createSelector } from "reselect";
import { formatMovie } from "../../movies";

const searchResultStateSelector = (state) => state.search;

export const searchResultSelector = createSelector(
  [(state) => state.search.searchResult],
  (searchResult) => {
    const {
      page = 0,
      total_results: totalElements,
      total_pages: totalPages,
      results,
      query,
    } = searchResult;

    const data = results?.map(formatMovie) || [];
    const hasMore = page ? page < totalElements : true;

    return {
      searchResult: data,
      totalElements,
      totalPages,
      page,
      hasMore,
      query,
    };
  }
);
