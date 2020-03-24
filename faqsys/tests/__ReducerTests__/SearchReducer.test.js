import searchReducer, {initialState} from '../../src/reducers/SearchReducer'
import {SET_SEARCH_QUERY,
SET_SEARCH_RESULTS,
SET_SEARCH_PENDING,
SET_SEARCH_ERROR,
SET_SEARCH_SUCCESS,} from  '../../src/actions/actionTypes'

describe('errorReducer', () => {
  it('should handle SET_SEARCH_QUERY', () => {
    const data = "asfds"
    const action = {
      type: SET_SEARCH_QUERY,
      payload: data,
    }

    expect(searchReducer(initialState, action))
  }),
  it('should handle SET_SEARCH_RESULTS', () => {
    const data = "asfds"
    const action = {
      type: SET_SEARCH_RESULTS,
      payload: data,
    }

    expect(searchReducer(initialState, action))
  }),
  it('should handle SET_SEARCH_PENDING', () => {
    const data = true
    const action = {
      type: SET_SEARCH_PENDING,
      payload: data,
    }

    expect(searchReducer(initialState, action))
  }),
  it('should handle SET_SEARCH_ERROR', () => {
    const data = true
    const action = {
      type: SET_SEARCH_ERROR,
      payload: data,
    }

    expect(searchReducer(initialState, action))
  }),
  it('should handle SET_SEARCH_SUCCESS', () => {
    const data = true
    const action = {
      type: SET_SEARCH_SUCCESS,
      payload: data,
    }

    expect(searchReducer(initialState, action))
  })
})
