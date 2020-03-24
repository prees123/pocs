import {
  SET_ARTICLE_FORM_SUBMISSION_FAILURE,
  SET_ARTICLE_FORM_SUBMISSION_PENDING,
  SET_ARTICLE_FORM_SUBMISSION_SUCCESS,
  SET_ARTICLE_FORM_UPDATE_FAILURE,
  SET_ARTICLE_FORM_UPDATE_PENDING,
  SET_ARTICLE_FORM_UPDATE_SUCCESS,
  SET_CATEGORY_CREATION_FAILURE,
  SET_CATEGORY_CREATION_PENDING,
  SET_CATEGORY_CREATION_SUCCESS,
  SET_CATEGORY_ERROR,
  SET_FILE_CLICKED,
  SET_FORM_CATEGORIES,
  SET_FORM_DESCRIPTION,
  SET_FORM_TAGS,
  SET_FORM_TITLE,
  SET_QUILL_CLICKED,
  SET_TITLE_ERROR,
} from '../actionTypes'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'
import * as notificationActions from '../Notification/NotificationActions'
import {setArticle} from '../Article/ArticleActions'
import {setContentBlocks} from '../ContentBlock/ContentBlockActions'

export function submitArticleForm (form) {
  return dispatch => {
    dispatch(setArticleFormSubmissionPending(true))
    axios.post(apiConfig.submitArticle, form).then(() => {
      dispatch(setArticleFormSubmissionSuccess(true))
      dispatch(notificationActions.showNotification(true, 'Article Successfully Submitted'))
    }).catch(() => {
      dispatch(setArticleFormSubmissionFailure(true))
      dispatch(notificationActions.showNotification(true, 'Article Submission Failed'))
    }).finally(() => {
      dispatch(setArticleFormSubmissionPending(false))
    })
  }
}

export function updateArticle (form, articleId) {
  const {categories, tagIds} = form
  return dispatch => {
    dispatch(setArticleFormUpdatePending(true))
    axios.put(apiConfig.updateArticleCategories.replace(':id', articleId), {categories}).then(() => {
      axios.put(apiConfig.updateArticleTags.replace(':id', articleId), {tagIds}).then(() => {
        axios.put(apiConfig.updateArticle.replace(':id', articleId), form).then(() => {
          dispatch(setArticleFormUpdateSuccess(true))
          dispatch(notificationActions.showNotification(true, 'Article Successfully Updated'))
        }).catch(() => {
          dispatch(setArticleFormUpdateFailure(true))
          dispatch(notificationActions.showNotification(true, 'Article Update Failed'))
        }).finally(() => {
          dispatch(setArticleFormUpdatePending(false))
        })
      }).catch(() => {
        dispatch(setArticleFormSubmissionFailure(true))
        dispatch(setArticleFormSubmissionPending(false))
        dispatch(notificationActions.showNotification(true, 'Article tag update failed. Resubmit your changes'))
      })
    }).catch(() => {
      dispatch(setArticleFormSubmissionFailure(true))
      dispatch(setArticleFormSubmissionPending(false))
      dispatch(notificationActions.showNotification(true, 'Article category update failed. Resubmit your changes'))
    })
  }
}

export function vote (form, articleId) {
  return dispatch => {
    dispatch(setArticleFormUpdatePending(true))
    axios.put(apiConfig.updateArticle.replace(':id', articleId), form).then(() => {
      dispatch(setArticleFormUpdateSuccess(true))
      dispatch(notificationActions.showNotification(true, 'Vote Successfully Submitted'))
    }).catch(() => {
      dispatch(setArticleFormUpdateFailure(true))
      dispatch(notificationActions.showNotification(true, 'Vote Submission Failed'))
    }).finally(() => {
      dispatch(setArticleFormUpdatePending(false))
    })
  }
}

export function resetArticleFormAndArticle () {
  return dispatch => {
    dispatch(setContentBlocks([]))
    dispatch(setFormTags([]))
    dispatch(setFormTitle(''))
    dispatch(setFormCategories([]))
    dispatch(setFormDescription(''))
    dispatch(setTitleError(''))
    dispatch(setCategoryError(''))
    dispatch(setQuillClicked(false))
    dispatch(setFileClicked(false))
    dispatch(setArticle({}))
  }
}

export function setCategoryCreationPending (isCategoryCreationPending) {
  return {type: SET_CATEGORY_CREATION_PENDING, isCategoryCreationPending}
}

export function setCategoryCreationSuccess (isCategoryCreationSuccess) {
  return {type: SET_CATEGORY_CREATION_SUCCESS, isCategoryCreationSuccess}
}

export function setCategoryCreationFailure (isCategoryCreationFailure) {
  return {type: SET_CATEGORY_CREATION_FAILURE, isCategoryCreationFailure}
}

export function setArticleFormSubmissionPending (isArticleSubmissionPending) {
  return {type: SET_ARTICLE_FORM_SUBMISSION_PENDING, isArticleSubmissionPending}
}

export function setArticleFormSubmissionFailure (isArticleSubmissionFailure) {
  return {type: SET_ARTICLE_FORM_SUBMISSION_FAILURE, isArticleSubmissionFailure}
}

export function setArticleFormSubmissionSuccess (isArticleSubmissionSuccess) {
  return {type: SET_ARTICLE_FORM_SUBMISSION_SUCCESS, isArticleSubmissionSuccess}
}

export function setArticleFormUpdatePending (isArticleUpdatePending) {
  return {type: SET_ARTICLE_FORM_UPDATE_PENDING, isArticleUpdatePending}
}

export function setArticleFormUpdateFailure (isArticleUpdateFailure) {
  return {type: SET_ARTICLE_FORM_UPDATE_FAILURE, isArticleUpdateFailure}
}

export function setArticleFormUpdateSuccess (isArticleUpdateSuccess) {
  return {type: SET_ARTICLE_FORM_UPDATE_SUCCESS, isArticleUpdateSuccess}
}

export function setFormTags (formTags) {
  return {type: SET_FORM_TAGS, formTags}
}

export function setFormCategories (formCategories) {
  return {type: SET_FORM_CATEGORIES, formCategories}
}

export function setFormTitle (formTitle) {
  return {type: SET_FORM_TITLE, formTitle}
}

export function setFormDescription (formDescription) {
  return {type: SET_FORM_DESCRIPTION, formDescription}
}

export function setTitleError (titleError) {
  return {type: SET_TITLE_ERROR, titleError}
}

export function setCategoryError (categoryError) {
  return {type: SET_CATEGORY_ERROR, categoryError}
}

export function setQuillClicked (quillClicked) {
  return {type: SET_QUILL_CLICKED, quillClicked}
}

export function setFileClicked (fileClicked) {
  return {type: SET_FILE_CLICKED, fileClicked}
}
