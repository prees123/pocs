import {
  APPEND_CATEGORY,
  SET_CATEGORIES,
  SET_CATEGORY_ID,
  SET_CATEGORY_NAME,
  SET_CREATE_CATEGORY_ERROR,
  SET_CREATE_CATEGORY_PENDING,
  SET_CREATE_CATEGORY_SUCCESS,
  SET_GET_CATEGORIES_ERROR,
  SET_GET_CATEGORIES_PENDING,
  SET_IS_MENU_AND_SEARCH_FUNCTIONALITY_DISABLED,
  SET_TOP_LEVEL_CATEGORY_ID,
  SET_TOP_LEVEL_CATEGORY_NAME,
} from '../actionTypes'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'

export function getCategories () {
  return dispatch => {
    dispatch(setGetCategoriesPending(true))
    axios.get(apiConfig.getCategories).then(({data: categoriesData}) => {
      dispatch(setCategories(categoriesData))
    }).catch(() => {
      dispatch(setGetCategoriesError(true))
    }).finally(() => {
      dispatch(setGetCategoriesPending(false))
    })
  }
}

export function getChildrenCategoriesById (categoryId) {
  return dispatch => {
    dispatch(setGetCategoriesPending(true))
    axios.post(apiConfig.getChildrenCategoriesById.replace('{categoryId}', categoryId)).then(({data: categoriesData}) => {
      dispatch(setCategories(categoriesData))
    }).catch(() => {
      dispatch(setGetCategoriesError(true))
    }).finally(() => {
      dispatch(setGetCategoriesPending(false))
    })
  }
}

export function getTopLevelCategories () {
  return dispatch => {
    dispatch(setGetCategoriesPending(true))
    axios.get(apiConfig.getTopLevelCategories).then(({data: categoriesData}) => {
      dispatch(setCategories(categoriesData))
    }).catch(() => {
      dispatch(setGetCategoriesError(true))
    }).finally(() => {
      dispatch(setGetCategoriesPending(false))
    })
  }
}

export function getCategoryByName (name) {
  return dispatch => {
    dispatch(setGetCategoriesPending(true))
    let query = `?name=` + name
    axios.get(apiConfig.getCategoryByName + query).then(({data: categoriesData}) => {
      dispatch(setCategories(categoriesData.children))
      dispatch(setCategoryName(categoriesData.name))
      dispatch(setCategoryId(categoriesData.id))
      dispatch(setTopLevelCategoryId(categoriesData.id))
      dispatch(setTopLevelCategoryName(categoriesData.name))
    }).catch(() => {
      dispatch(setGetCategoriesError(true))
    }).finally(() => {
      dispatch(setGetCategoriesPending(false))
    })
  }
}

export function submitCategory (formValues) {
  return dispatch => {
    dispatch(setCreateCategoryPending(true))
    axios.post(apiConfig.submitCategory, formValues).then(function success ({data: newCategory}) {
      dispatch(appendCategory(newCategory))
      dispatch(setCreateCategorySuccess(true))
    }).catch(() => {
      dispatch(setCreateCategoryError(true))
    }).finally(() => {
      dispatch(setCreateCategoryPending(false))
    })
  }
}

export function appendCategory (newCategory) {
  return {type: APPEND_CATEGORY, newCategory}
}

export function setCategories (categories) {
  return {type: SET_CATEGORIES, categories}
}

export function setCategoryId (categoryId) {
  return {type: SET_CATEGORY_ID, categoryId}
}

export function setCategoryName (categoryName) {
  return {type: SET_CATEGORY_NAME, categoryName}
}

export function setGetCategoriesPending (isGetCategoriesPending) {
  return {type: SET_GET_CATEGORIES_PENDING, isGetCategoriesPending}
}

export function setGetCategoriesError (isGetCategoriesError) {
  return {type: SET_GET_CATEGORIES_ERROR, isGetCategoriesError}
}

export function setCreateCategoryError (isCreateCategoryError) {
  return {type: SET_CREATE_CATEGORY_ERROR, isCreateCategoryError}
}

export function setCreateCategoryPending (isCreateCategoryPending) {
  return {type: SET_CREATE_CATEGORY_PENDING, isCreateCategoryPending}
}

export function setCreateCategorySuccess (isCreateCategorySuccess) {
  return {type: SET_CREATE_CATEGORY_SUCCESS, isCreateCategorySuccess}
}

export function setMenuAndSearchFunctionalityDisabled (isMenuAndSearchFunctionalityDisabled) {
  return {type: SET_IS_MENU_AND_SEARCH_FUNCTIONALITY_DISABLED, isMenuAndSearchFunctionalityDisabled}
}

export function setTopLevelCategoryId (topLevelCategoryId) {
  return {type: SET_TOP_LEVEL_CATEGORY_ID, topLevelCategoryId}
}

export function setTopLevelCategoryName (topLevelCategoryName) {
  return {type: SET_TOP_LEVEL_CATEGORY_NAME, topLevelCategoryName}
}
