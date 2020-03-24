import {
  CREATE_IDEA,
  DELETE_IDEA,
  SET_FILTERED_IDEAS,
  SET_IDEAS,
  UPDATE_IDEA,
} from '../actionTypes'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'
import * as notificationActions from '../Notification/NotificationActions'
import {
  setGetCategoriesError,
  setGetCategoriesPending,
  setTopLevelCategoryId,
  setTopLevelCategoryName,
} from '../Category/CategoryActions'

export function getIdeas (topLevelCategoryId) {
  return dispatch => {
    axios.get(apiConfig.getIdeas.replace('{topLevelCategoryId}', topLevelCategoryId)).then(({data: ideas}) => {
      dispatch(setIdeas(ideas))
      dispatch(setFilteredIdeas([...ideas]))
    }).catch(() => {
      dispatch(notificationActions.showNotification(true, 'Unable to fetch app ideas'))
    })
  }
}

export function getIdeasByTopLevelCategoryName (name) {
  return dispatch => {
    let query = `?name=` + name
    axios.get(apiConfig.getCategoryByName + query).then(({data: categoriesData}) => {
      dispatch(setTopLevelCategoryId(categoriesData.id))
      dispatch(setTopLevelCategoryName(categoriesData.name))
      dispatch(getIdeas(categoriesData.id))
    }).catch(() => {
      dispatch(setGetCategoriesError(true))
    }).finally(() => {
      dispatch(setGetCategoriesPending(false))
    })
  }
}

export function setIdeas (ideas) {
  return {type: SET_IDEAS, ideas}
}

export function setFilteredIdeas (filteredIdeas) {
  return {type: SET_FILTERED_IDEAS, filteredIdeas}
}

export function updateIdea (ideaId, idea) {
  return dispatch => {
    axios.put(apiConfig.updateIdea.replace('{ideaId}', ideaId), idea).then(({data: updatedIdea}) => {
      dispatch({type: UPDATE_IDEA, updatedIdea})
    }).catch(() => {
      dispatch(notificationActions.showNotification(true, 'Failed to update the idea'))
    })
  }
}

export function createIdea (idea) {
  return dispatch => {
    axios.post(apiConfig.createIdea, idea).then(({data: createdIdea}) => {
      dispatch({type: CREATE_IDEA, createdIdea})
      dispatch(notificationActions.showNotification(true, 'Great idea!'))
    }).catch(() => {
      dispatch(notificationActions.showNotification(true, 'Sorry! Unable to add your idea right now'))
    })
  }
}

export function deleteIdea (idea) {
  return dispatch => {
    axios.delete(apiConfig.deleteIdea.replace('{ideaId}', idea.id)).then(() => {
      dispatch({type: DELETE_IDEA, deletedIdea: idea})
      dispatch(notificationActions.showNotification(true, `${idea.title} deleted successfully`))
    }).catch(() => {
      dispatch(notificationActions.showNotification(true, `Problem while deleting ${idea.title}`))
    })
  }
}
