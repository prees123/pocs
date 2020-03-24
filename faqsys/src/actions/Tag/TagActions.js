import {
  APPEND_TAG,
  SET_CREATE_TAG_ERROR,
  SET_CREATE_TAG_PENDING,
  SET_CREATE_TAG_SUCCESS,
  SET_GET_TAGS_ERROR,
  SET_GET_TAGS_PENDING,
  SET_GET_TAGS_SUCCESS,
  SET_TAGS,
} from '../actionTypes'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'

export function getTags (topLevelCategoryId) {
  return dispatch => {
    dispatch(setGetTagsPending(true))
    axios.get(apiConfig.getTags.replace('{topLevelCategoryId}', topLevelCategoryId)).then(({data: tags}) => {
      dispatch(setTags(tags))
      dispatch(setGetTagsSuccess(true))
    }).catch(function error (e) {
      dispatch(setGetTagsError(true))
    }).finally(() => {
      dispatch(setGetTagsPending(false))
    })
  }
}

export function createTag (name, createdBy, topLevelCategoryId) {
  return dispatch => {
    dispatch(setCreateTagPending(true))
    let requestBody = {
      name: name,
      createdBy: createdBy,
      topLevelCategoryId: topLevelCategoryId,
    }
    axios.post(apiConfig.createTag, requestBody).then(({data: newTag}) => {
      dispatch(appendTag(newTag))
      dispatch(setCreateTagSuccess(true))
    }).catch(() => {
      dispatch(setCreateTagError(true))
    }).finally(() => {
      dispatch(setCreateTagPending(false))
    })
  }
}

export function appendTag (newTag) {
  return {type: APPEND_TAG, newTag}
}

export function setTags (tags) {
  return {type: SET_TAGS, tags}
}

export function setGetTagsError (isGetTagsError) {
  return {type: SET_GET_TAGS_ERROR, isGetTagsError}
}

export function setGetTagsPending (isGetTagsPending) {
  return {type: SET_GET_TAGS_PENDING, isGetTagsPending}
}

export function setGetTagsSuccess (isGetTagsSuccess) {
  return {type: SET_GET_TAGS_SUCCESS, isGetTagsSuccess}
}

export function setCreateTagError (isCreateTagError) {
  return {type: SET_CREATE_TAG_ERROR, isCreateTagError}
}

export function setCreateTagPending (isCreateTagPending) {
  return {type: SET_CREATE_TAG_PENDING, isCreateTagPending}
}

export function setCreateTagSuccess (isCreateTagSuccess) {
  return {type: SET_CREATE_TAG_SUCCESS, isCreateTagSuccess}
}
