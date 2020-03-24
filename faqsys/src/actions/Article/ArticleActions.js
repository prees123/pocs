import {
  SET_ARTICLE,
  SET_ARTICLES,
  SET_GET_ARTICLE_ERROR,
  SET_GET_ARTICLE_PENDING,
  SET_GET_ARTICLES_ERROR,
  SET_GET_ARTICLES_PENDING,
  SUBMIT_COMMENT_ERROR,
  SUBMIT_COMMENT_PENDING,
} from '../actionTypes'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'
import * as notificationActions from '../Notification/NotificationActions'
import * as constants from '../../constants/constants'

export function getArticles (categoryId, live) {
  return dispatch => {
    dispatch(setGetArticlesPending(true))
    axios.get(apiConfig.getArticlesByCategory.replace('{categoryId}', categoryId)).then(({data}) => {
      let articlesData = data.articles
      if (live) {
        let liveArticles = []
        for (let i = 0; i < articlesData.length; i++) {
          if (articlesData[i].status === constants.articleStatusValues.live) {
            liveArticles.push(articlesData[i])
          }
        }
        dispatch(setArticles(liveArticles))
      } else {
        dispatch(setArticles(articlesData))
      }
    }).catch(() => {
      dispatch(setGetArticlesError(true))
    }).finally(() => {
      dispatch(setGetArticlesPending(false))
    })
  }
}

export function getArticlesByTagId (tagId, live) {
  return dispatch => {
    dispatch(setGetArticlesPending(true))
    axios.get(apiConfig.getArticlesByTagId.replace(':tagId', tagId)).then(({data}) => {
      let articlesData = data.articles
      if (live) {
        let liveArticles = []
        for (let i = 0; i < articlesData.length; i++) {
          if (articlesData[i].status === constants.articleStatusValues.live) {
            liveArticles.push(articlesData[i])
          }
        }
        dispatch(setArticles(liveArticles))
      } else {
        dispatch(setArticles(articlesData))
      }
    }).catch(() => {
      dispatch(setGetArticlesError(true))
    }).finally(() => {
      dispatch(setGetArticlesPending(false))
    })
  }
}

export function getArticleById (articleId) {
  return dispatch => {
    dispatch(setGetArticlePending(true))
    axios.get(apiConfig.getArticleById.replace('{articleId}', articleId)).then(({data: article}) => {
      dispatch(setArticle(article))
    }).catch(() => {
      dispatch(setGetArticleError(true))
    }).finally(() => {
      dispatch(setGetArticlePending(false))
    })
  }
}

export function deleteArticle (articleId, categoryId) {
  return dispatch => {
    dispatch(setGetArticlesPending(true))
    axios.delete(apiConfig.deleteArticle.replace('{articleId}', articleId)).then(({data}) => {
      dispatch(getArticles(categoryId))
    }).catch(() => {
      dispatch(setGetArticlesError(true))
    }).finally(() => {
      dispatch(setGetArticlesPending(false))
    })
  }
}

export function putFile (bucketName, inputFile, fileName) {
  return dispatch => {
    const formData = new FormData()/* eslint-disable-line */
    formData.append('file', inputFile)
    formData.append('fileName', fileName)
    axios.post(apiConfig.uploadFile.replace('{bucketName}', bucketName), formData).then(({data, status}) => {
      const splitResponse = data.split('/')
      if (status === '200') {
        dispatch(notificationActions.showNotification(true, 'Successfully Uploaded' + splitResponse[splitResponse.length - 1]))
      }
    }).catch((error) => {
      dispatch(notificationActions.showNotification(true, error.toString()))
    })
  }
}

export function deleteFile (bucketName, file) {
  return dispatch => {
    axios.delete(apiConfig.deleteFile.replace('{bucketName}', bucketName).replace('{fileName}', file)).then(({status}) => {
      if (status === '200') {
        dispatch(notificationActions.showNotification(true, 'Successfully Removed Image'))
      }
    }).catch((error) => {
      dispatch(notificationActions.showNotification(true, error.toString()))
    })
  }
}

export function addComment (commentData) {
  return dispatch => {
    dispatch(submitCommentPending(true))
    axios.post(apiConfig.submitComment, commentData).then(() => {
    }).catch(() => {
      dispatch(submitCommentError(true))
    }).finally(() => {
      dispatch(submitCommentPending(false))
    })
  }
}

export function setArticles (articles) {
  return {type: SET_ARTICLES, articles}
}

export function setGetArticlesPending (isGetArticlesPending) {
  return {type: SET_GET_ARTICLES_PENDING, isGetArticlesPending}
}

export function setGetArticlesError (isGetArticlesError) {
  return {type: SET_GET_ARTICLES_ERROR, isGetArticlesError}
}

export function setGetArticlePending (isGetArticlePending) {
  return {type: SET_GET_ARTICLE_PENDING, isGetArticlePending}
}

export function setGetArticleError (isGetArticleError) {
  return {type: SET_GET_ARTICLE_ERROR, isGetArticleError}
}

export function submitCommentPending (isSubmitCommentPending) {
  return {type: SUBMIT_COMMENT_PENDING, isSubmitCommentPending}
}

export function submitCommentError (isSubmitCommentError) {
  return {type: SUBMIT_COMMENT_ERROR, isSubmitCommentError}
}

export function setArticle (article) {
  return {type: SET_ARTICLE, article}
}
