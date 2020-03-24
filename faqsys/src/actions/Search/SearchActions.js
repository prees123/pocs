import {
  SET_SEARCH_ERROR,
  SET_SEARCH_PENDING,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SEARCH_SUCCESS,
  SET_SHOULD_EXECUTE_SEARCH_QUERY,
} from '../actionTypes'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'
import {setArticles} from '../Article/ArticleActions'

export function executeSearchQuery (hasWriteAccess, searchQuery, topLevelCategoryId) {
  let requestBody = {
    searchQuery,
    hasWriteAccess,
    topLevelCategoryId,
  }
  return dispatch => {
    dispatch(setSearchPending(true))
    dispatch(setSearchQuery(searchQuery))
    axios.post(apiConfig.search, requestBody).then(({data}) => {
      let searchResults = data.searchResults
      dispatch(setSearchSuccess(true))
      dispatch(setSearchResults(searchResults))
      dispatch(setArticles(searchResults))
    }).catch(() => {
      dispatch(setSearchError(true))
    }).finally(() => {
      dispatch(setSearchPending(false))
    })
  }
}

export function setSearchQuery (searchQuery) {
  return {type: SET_SEARCH_QUERY, searchQuery}
}

export function setSearchResults (searchResults) {
  return {type: SET_SEARCH_RESULTS, searchResults}
}

export function setSearchError (isSearchError) {
  return {type: SET_SEARCH_ERROR, isSearchError}
}

export function setSearchPending (isSearchPending) {
  return {type: SET_SEARCH_PENDING, isSearchPending}
}

export function setSearchSuccess (isSearchSuccess) {
  return {type: SET_SEARCH_SUCCESS, isSearchSuccess}
}

export function setShouldExecuteSearchQuery (shouldExecuteSearchQuery) {
  return {type: SET_SHOULD_EXECUTE_SEARCH_QUERY, shouldExecuteSearchQuery}
}
