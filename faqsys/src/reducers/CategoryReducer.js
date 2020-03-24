import {
  SET_CREATE_CATEGORY_ERROR,
  SET_CREATE_CATEGORY_SUCCESS,
  SET_CREATE_CATEGORY_PENDING,
  APPEND_CATEGORY,
  SET_CATEGORIES,
  SET_CATEGORY_ID,
  SET_CATEGORY_NAME,
  SET_GET_CATEGORIES_ERROR,
  SET_GET_CATEGORIES_PENDING,
  SET_IS_MENU_AND_SEARCH_FUNCTIONALITY_DISABLED,
  SET_TOP_LEVEL_CATEGORY_ID,
  SET_TOP_LEVEL_CATEGORY_NAME,
} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  categories: [],
  isGetCategoriesPending: false,
  isGetCategoriesError: false,
  categoryId: '',
  categoryName: '',
  isCreateCategorySuccess: false,
  isCreateCategoryPending: false,
  isCreateCategoryError: false,
  isMenuAndSearchFunctionalityDisabled: false,
  topLevelCategoryId: null,
  topLevelCategoryName: '',
}

export default function CategoryReducer (state = initialState, {type, categories, categoryId, categoryName, isGetCategoriesPending, isGetCategoriesError, isCreateCategoryError, isCreateCategorySuccess, isCreateCategoryPending, isMenuAndSearchFunctionalityDisabled, newCategory, topLevelCategoryId, topLevelCategoryName}) {
  let result
  switch (type) {
    case SET_CATEGORIES:
    {
      result = update(state, {
        categories: {
          $set: categories,
        },
      })
      break
    }
    case SET_CATEGORY_ID:
    {
      result = update(state, {
        categoryId: {
          $set: categoryId,
        },
      })
      break
    }
    case SET_CATEGORY_NAME:
    {
      result = update(state, {
        categoryName: {
          $set: categoryName,
        },
      })
      break
    }
    case SET_GET_CATEGORIES_PENDING:
    {
      result = update(state, {
        isGetCategoriesPending: {
          $set: isGetCategoriesPending,
        },
      })
      break
    }
    case SET_GET_CATEGORIES_ERROR:
    {
      result = update(state, {
        isGetCategoriesError: {
          $set: isGetCategoriesError,
        },
      })
      break
    }

    case SET_CREATE_CATEGORY_ERROR:
    {
      result = update(state, {
        isCreateCategoryError: {
          $set: isCreateCategoryError,
        },
      })
      break
    }
    case SET_CREATE_CATEGORY_SUCCESS:
    {
      result = update(state, {
        isCreateCategorySuccess: {
          $set: isCreateCategorySuccess,
        },
      })
      break
    }
    case SET_CREATE_CATEGORY_PENDING:
    {
      result = update(state, {
        isCreateCategoryPending: {
          $set: isCreateCategoryPending,
        },
      })
      break
    }
    case APPEND_CATEGORY:
    {
      result = update(state, {
        categories: {
          $set: [...state.categories, newCategory],
        },
      })
      break
    }

    case SET_IS_MENU_AND_SEARCH_FUNCTIONALITY_DISABLED:
    {
      result = update(state, {
        isMenuAndSearchFunctionalityDisabled: {
          $set: isMenuAndSearchFunctionalityDisabled,
        },
      })
      break
    }

    case SET_TOP_LEVEL_CATEGORY_ID:
    {
      result = update(state, {
        topLevelCategoryId: {
          $set: topLevelCategoryId,
        },
      })
      break
    }

    case SET_TOP_LEVEL_CATEGORY_NAME:
    {
      result = update(state, {
        topLevelCategoryName: {
          $set: topLevelCategoryName,
        },
      })
      break
    }

    default:
      return state
  }
  return result
}
