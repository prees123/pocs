import {setCategories, setCategoryId, setCategoryName, setGetCategoriesPending, setGetCategoriesError, deleteCategoriesPending, deleteCategoriesError} from '../../src/actions/Category/CategoryActions'

import {SET_CATEGORIES, SET_CATEGORY_ID, SET_CATEGORY_NAME, SET_GET_CATEGORIES_ERROR, SET_GET_CATEGORIES_PENDING, DELETE_CATEGORIES_PENDING, DELETE_CATEGORIES_ERROR} from '../../src/actions/actionTypes'

describe('category actions', () => {
  it('should create an action to set the categories', () => {
    const data = [
      {
        "id": 302,
        "name": "asdfsadfsadf",
        "parentCategoryId": null
      }, {
        "id": 291,
        "name": "Brand New Category",
        "parentCategoryId": null
      }
    ]
    const expectedAction = {
      type: SET_CATEGORIES,
      categories: data
    }
    expect(setCategories(data)).toEqual(expectedAction)
  }),
  it('should create an action to set the category id', () => {
    const data = ("id": 302)
    const expectedAction = {
      type: SET_CATEGORY_ID,
      categoryId: data
    }
    expect(setCategoryId(data)).toEqual(expectedAction)
  }),
  it('should create an action to set the category name', () => {
    const data = ("name": "CategoryName")
    const expectedAction = {
      type: SET_CATEGORY_NAME,
      categoryName: data
    }
    expect(setCategoryName(data)).toEqual(expectedAction)
  }),
  it('should create an action to set the get categories as pending', () => {
    const data = true
    const expectedAction = {
      type: SET_GET_CATEGORIES_PENDING,
      isGetCategoriesPending: data
    }
    expect(setGetCategoriesPending(data)).toEqual(expectedAction)
  }),
  it('should create an action to set the get categories as error', () => {
    const data = true
    const expectedAction = {
      type: SET_GET_CATEGORIES_ERROR,
      isGetCategoriesError: data
    }
    expect(setGetCategoriesError(data)).toEqual(expectedAction)
  })
})
