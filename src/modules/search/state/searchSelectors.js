import { createSelector } from "reselect";
import { formatMovie } from "../../movies";

const searchResultStateSelector = (state) => state.search;

export const searchResultSelector = createSelector(
  [searchResultStateSelector],
  (searchResultData) => {
    const { loading, error, searchResult } = searchResultData;
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
      loading,
      error,
      searchResult: data,
      totalElements,
      totalPages,
      page,
      hasMore,
      query,
    };
  }
);
