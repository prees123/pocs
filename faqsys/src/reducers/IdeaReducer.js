import update from 'immutability-helper'
import * as _ from 'lodash'
import {CREATE_IDEA, DELETE_IDEA, SET_FILTERED_IDEAS, SET_IDEAS, UPDATE_IDEA} from '../actions/actionTypes'

const initialState = {
  ideas: [],
  filteredIdeas: [],
}

const getIdeaIndex = ({id}, ideaList) => {
  return _.findIndex(ideaList, {id})
}

export default function ideaReducer (state = initialState, {type, ideas, filteredIdeas, updatedIdea, createdIdea, deletedIdea}) {
  let ideasIndex, filteredIdeasIndex
  switch (type) {
    case SET_IDEAS:
      return update(state, {
        ideas: {
          $set: ideas,
        },
      })
    case SET_FILTERED_IDEAS:
      return update(state, {
        filteredIdeas: {
          $set: filteredIdeas,
        },
      })
    case UPDATE_IDEA:
      ideasIndex = getIdeaIndex(updatedIdea, state.ideas)
      filteredIdeasIndex = getIdeaIndex(updatedIdea, state.filteredIdeas)
      return update(state, {
        ideas: {
          [ideasIndex]: {
            $set: updatedIdea,
          },
        },
        filteredIdeas: {
          [filteredIdeasIndex]: {
            $set: updatedIdea,
          },
        },
      })
    case CREATE_IDEA:
      return update(state, {
        ideas: {
          $set: [createdIdea, ...state.ideas],
        },
        filteredIdeas: {
          $set: [createdIdea, ...state.filteredIdeas],
        },
      })
    case DELETE_IDEA:
      ideasIndex = getIdeaIndex(deletedIdea, state.ideas)
      filteredIdeasIndex = getIdeaIndex(deletedIdea, state.filteredIdeas)
      return update(state, {
        ideas: {
          $splice: [[ideasIndex, 1]],
        },
        filteredIdeas: {
          $splice: [[filteredIdeasIndex, 1]],
        },
      })
    default:
      return state
  }
}
