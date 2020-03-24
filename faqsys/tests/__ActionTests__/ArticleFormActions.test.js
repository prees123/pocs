import {SET_ARTICLE_FORM_SUBMISSION_PENDING, SET_ARTICLE_FORM_SUBMISSION_FAILURE, SET_ARTICLE_FORM_SUBMISSION_SUCCESS, SET_CATEGORY_CREATION_PENDING, SET_CATEGORY_CREATION_SUCCESS, SET_CATEGORY_CREATION_FAILURE, SET_ARTICLE_FORM_UPDATE_PENDING, SET_ARTICLE_FORM_UPDATE_FAILURE, SET_ARTICLE_FORM_UPDATE_SUCCESS} from  '../../src/actions/actionTypes'
import {setCategoryCreationPending, setCategoryCreationSuccess, setCategoryCreationFailure, setArticleFormSubmissionPending, setArticleFormSubmissionSuccess, setArticleFormSubmissionFailure, setArticleFormUpdatePending, setArticleFormUpdateSuccess, setArticleFormUpdateFailure} from '../../src/actions/ArticleForm/ArticleFormActions'

describe('article form actions', () => {
  it('should create an action to set category creation as pending', () => {
    const data = true
    const expectedAction = {
      type: SET_CATEGORY_CREATION_PENDING,
      isCategoryCreationPending: data
    }
    expect(setCategoryCreationPending(data)).toEqual(expectedAction)
  }),
  it('should create an action to set category creation as success', () => {
    const data = true
    const expectedAction = {
      type: SET_CATEGORY_CREATION_SUCCESS,
      isCategoryCreationSuccess: data
    }
    expect(setCategoryCreationSuccess(data)).toEqual(expectedAction)
  }),
  it('should create an action to set category creation as failure', () => {
    const data = true
    const expectedAction = {
      type: SET_CATEGORY_CREATION_FAILURE,
      isCategoryCreationFailure: data
    }
    expect(setCategoryCreationFailure(data)).toEqual(expectedAction)
  }),
  it('should create an action to set article form submission as pending', () => {
    const data = true
    const expectedAction = {
      type: SET_ARTICLE_FORM_SUBMISSION_PENDING,
      isArticleSubmissionPending: data
    }
    expect(setArticleFormSubmissionPending(data)).toEqual(expectedAction)
  }),
  it('should create an action to set article form submission as success', () => {
    const data = true
    const expectedAction = {
      type: SET_ARTICLE_FORM_SUBMISSION_SUCCESS,
      isArticleSubmissionSuccess: data
    }
    expect(setArticleFormSubmissionSuccess(data)).toEqual(expectedAction)
  }),
  it('should create an action to set article form submission as failure', () => {
    const data = true
    const expectedAction = {
      type: SET_ARTICLE_FORM_SUBMISSION_FAILURE,
      isArticleSubmissionFailure: data
    }
    expect(setArticleFormSubmissionFailure(data)).toEqual(expectedAction)
  }),
  it('should create an action to set article form update as pending', () => {
    const data = true
    const expectedAction = {
      type: SET_ARTICLE_FORM_UPDATE_PENDING,
      isArticleUpdatePending: data
    }
    expect(setArticleFormUpdatePending(data)).toEqual(expectedAction)
  }),
  it('should create an action to set article form update as success', () => {
    const data = true
    const expectedAction = {
      type: SET_ARTICLE_FORM_UPDATE_SUCCESS,
      isArticleUpdateSuccess: data
    }
    expect(setArticleFormUpdateSuccess(data)).toEqual(expectedAction)
  }),
  it('should create an action to set article form update as failure', () => {
    const data = true
    const expectedAction = {
      type: SET_ARTICLE_FORM_UPDATE_FAILURE,
      isArticleUpdateFailure: data
    }
    expect(setArticleFormUpdateFailure(data)).toEqual(expectedAction)
  })
})
