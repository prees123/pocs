import {
  SUBMIT_COMMENT_ERROR,
  SUBMIT_COMMENT_PENDING,
  SET_ARTICLES,
  SET_ARTICLE,
  SET_GET_ARTICLES_ERROR,
  SET_GET_ARTICLES_PENDING,
  SET_GET_ARTICLE_ERROR,
  SET_GET_ARTICLE_PENDING,
} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  articles: [],
  article: {},
  isGetArticlesPending: false,
  isGetArticlesError: false,
  isGetArticlePending: false,
  isGetArticleError: false,
  isSubmitCommentError: false,
  isSubmitCommentPending: false,
}

export default function ArticleReducer (state = initialState, {type, articles, article, isGetArticlesPending, isGetArticlesError, isGetArticlePending, isGetArticleError, isSubmitCommentPending, isSubmitCommentError}) {
  let result
  switch (type) {
    case SET_ARTICLES:
    {
      result = update(state, {
        articles: {
          $set: articles,
        },
      })
      break
    }
    case SET_ARTICLE:
    {
      result = update(state, {
        article: {
          $set: article,
        },
      })
      break
    }
    case SET_GET_ARTICLES_PENDING:
    {
      result = update(state, {
        isGetArticlesPending: {
          $set: isGetArticlesPending,
        },
      })
      break
    }
    case SET_GET_ARTICLES_ERROR:
    {
      result = update(state, {
        isGetArticlesError: {
          $set: isGetArticlesError,
        },
      })
      break
    }
    case SET_GET_ARTICLE_PENDING:
    {
      result = update(state, {
        isGetArticlePending: {
          $set: isGetArticlePending,
        },
      })
      break
    }
    case SET_GET_ARTICLE_ERROR:
    {
      result = update(state, {
        isGetArticleError: {
          $set: isGetArticleError,
        },
      })
      break
    }
    case SUBMIT_COMMENT_PENDING:
    {
      result = update(state, {
        isSubmitCommentPending: {
          $set: isSubmitCommentPending,
        },
      })
      break
    }
    case SUBMIT_COMMENT_ERROR:
    {
      result = update(state, {
        isSubmitCommentError: {
          $set: isSubmitCommentError,
        },
      })
      break
    }
    default:
      return state
  }
  return result
}
