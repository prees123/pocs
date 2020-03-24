import {SET_SEARCH_QUERY, SET_SEARCH_RESULTS, SET_SEARCH_PENDING, SET_SEARCH_ERROR, SET_SEARCH_SUCCESS} from '../../src/actions/actionTypes'
import {setSearchQuery, setSearchResults, setSearchError, setSearchPending, setSearchSuccess} from '../../src/actions/Search/SearchActions'

describe('search actions', () => {
  it('should set the search query', () => {
    const data = "asfdsf"
    const expectedAction = {
      type: SET_SEARCH_QUERY,
      searchQuery: data
    }
    expect(setSearchQuery(data)).toEqual(expectedAction)
  }),
  it('should set the search results', () => {
    const data = "asfdsf"
    const expectedAction = {
      type: SET_SEARCH_RESULTS,
      searchResults: data
    }
    expect(setSearchResults(data)).toEqual(expectedAction)
  }),
  it('should set the search error', () => {
    const data = true
    const expectedAction = {
      type: SET_SEARCH_ERROR,
      isSearchError: data
    }
    expect(setSearchError(data)).toEqual(expectedAction)
  }),
  it('should set the search pending', () => {
    const data = true
    const expectedAction = {
      type: SET_SEARCH_PENDING,
      isSearchPending: data
    }
    expect(setSearchPending(data)).toEqual(expectedAction)
  }),
  it('should set the search success', () => {
    const data = true
    const expectedAction = {
      type: SET_SEARCH_SUCCESS,
      isSearchSuccess: data
    }
    expect(setSearchSuccess(data)).toEqual(expectedAction)
  })
})
