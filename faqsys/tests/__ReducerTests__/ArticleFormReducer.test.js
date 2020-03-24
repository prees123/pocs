import {
  SET_ARTICLE_FORM_SUBMISSION_FAILURE,
  SET_ARTICLE_FORM_SUBMISSION_PENDING,
  SET_ARTICLE_FORM_SUBMISSION_SUCCESS,
  SET_CATEGORY_CREATION_PENDING,
  SET_CATEGORY_CREATION_SUCCESS,
  SET_CATEGORY_CREATION_FAILURE,
} from '../../src/actions/actionTypes'

import articleFormReducer, {initialState} from '../../src/reducers/ArticleFormReducer'

describe('article form reducer', () => {
  it('should handle SET_ARTICLE_FORM_SUBMISSION_PENDING', () => {
    const data = true
    const action = {
      type: SET_ARTICLE_FORM_SUBMISSION_PENDING,
      payload: data,
    }

    expect(articleFormReducer(initialState, action))
  }),
  it('should handle SET_ARTICLE_FORM_SUBMISSION_SUCCESS', () => {
    const data = true
    const action = {
      type: SET_ARTICLE_FORM_SUBMISSION_SUCCESS,
      payload: data,
    }

    expect(articleFormReducer(initialState, action))
  }),
  it('should handle SET_ARTICLE_FORM_SUBMISSION_FAILURE', () => {
    const data = true
    const action = {
      type: SET_ARTICLE_FORM_SUBMISSION_FAILURE,
      payload: data,
    }

    expect(articleFormReducer(initialState, action))
  }),
  it('should handle SET_CATEGORY_CREATION_PENDING', () => {
    const data = true
    const action = {
      type: SET_CATEGORY_CREATION_PENDING,
      payload: data,
    }

    expect(articleFormReducer(initialState, action))
  }),
  it('should handle SET_CATEGORY_CREATION_SUCCESS', () => {
    const data = true
    const action = {
      type: SET_CATEGORY_CREATION_SUCCESS,
      payload: data,
    }

    expect(articleFormReducer(initialState, action))
  }),
  it('should handle SET_CATEGORY_CREATION_FAILURE', () => {
    const data = true
    const action = {
      type: SET_CATEGORY_CREATION_FAILURE,
      payload: data,
    }

    expect(articleFormReducer(initialState, action))
  })
})
