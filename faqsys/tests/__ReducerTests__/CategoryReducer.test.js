import categoryReducer, {initialState} from '../../src/reducers/CategoryReducer'
import {SET_CATEGORIES, SET_CATEGORY_ID, SET_CATEGORY_NAME, SET_GET_CATEGORIES_ERROR, SET_GET_CATEGORIES_PENDING, DELETE_CATEGORIES_PENDING, DELETE_CATEGORIES_ERROR} from   '../../src/actions/actionTypes'

describe('categoryReducer', () => {
  it('should handle SET_CATEGORIES', () => {
    const data = [{
        "id": 302,
        "name": "asdfsadfsadf",
        "parentCategoryId": null
    },
    {
        "id": 291,
        "name": "Brand New Category",
        "parentCategoryId": null
  }]
    const action = {
      type: SET_CATEGORIES,
      payload: data,
    }

    expect(categoryReducer(initialState, action))
  }),
  it('should handle SET_CATEGORY_ID', () => {
    const data = ("id": 302)
    const action = {
      type: SET_CATEGORY_ID,
      payload: data,
    }

    expect(categoryReducer(initialState, action))
  })
  it('should handle SET_CATEGORY_NAME', () => {
    const data = ("categoryName": "categoryName")
    const action = {
      type: SET_CATEGORY_NAME,
      payload: data,
    }

    expect(categoryReducer(initialState, action))
  })
  it('should handle SET_GET_CATEGORIES_PENDING', () => {
    const data = true
    const action = {
      type: SET_GET_CATEGORIES_PENDING,
      payload: data,
    }

    expect(categoryReducer(initialState, action))
  })
  it('should handle SET_GET_CATEGORIES_ERROR', () => {
    const data = true
    const action = {
      type: SET_GET_CATEGORIES_ERROR,
      payload: data,
    }

    expect(categoryReducer(initialState, action))
  })
  it('should handle DELETE_CATEGORIES_PENDING', () => {
    const data = true
    const action = {
      type: DELETE_CATEGORIES_PENDING,
      payload: data,
    }

    expect(categoryReducer(initialState, action))
  })
  it('should handle DELETE_CATEGORIES_ERROR', () => {
    const data = true
    const action = {
      type: DELETE_CATEGORIES_ERROR,
      payload: data,
    }

    expect(categoryReducer(initialState, action))
  })
})
