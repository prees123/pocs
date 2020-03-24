import * as _ from 'lodash'
import * as constants from '../constants/constants'

const commonConfig = {
  auth: {
    authorizationPath: '/auth/oauth/v2/authorize',
    logoutPath: '/login/responses/logoff.html',
    popupOptions: {
      width: 482,
      height: 680,
    },
    redirectUri: `${window.location.origin}/auth/login`,
    responseType: 'token id_token',
    scope: ['openid profile'],
    storageType: 'localStorage',
    tokenType: 'Bearer',
  },
}
const envs = {
  service: {
    local: constants.serviceUrls.local,
    dev: constants.serviceUrls.dev,
    test: constants.serviceUrls.test,
    stg: constants.serviceUrls.stg,
    prod: constants.serviceUrls.prod,
  },
  mediaservice: {
    local: constants.mediaServiceUrls.local,
    dev: constants.mediaServiceUrls.dev,
    test: constants.mediaServiceUrls.test,
    stg: constants.mediaServiceUrls.stg,
    prod: constants.mediaServiceUrls.prod,
  },
  auth: {
    local: {
      host: constants.auth.nonProdHost,
      logoutHost: constants.auth.nonProdLogoutHost,
      clientId: constants.auth.nonProdClientId,
      nonce: constants.auth.nonce,
    },
    dev: {
      host: constants.auth.nonProdHost,
      logoutHost: constants.auth.nonProdLogoutHost,
      clientId: constants.auth.nonProdClientId,
      nonce: constants.auth.nonce,
    },
    test: {
      host: constants.auth.nonProdHost,
      logoutHost: constants.auth.nonProdLogoutHost,
      clientId: constants.auth.nonProdClientId,
      nonce: constants.auth.nonce,
    },
    stg: {
      host: constants.auth.prodHost,
      logoutHost: constants.auth.prodLogoutHost,
      clientId: constants.auth.prodClientId,
      nonce: constants.auth.nonce,
    },
    prod: {
      host: constants.auth.prodHost,
      logoutHost: constants.auth.prodLogoutHost,
      clientId: constants.auth.prodClientId,
      nonce: constants.auth.nonce,
    },
  },
}

// env.js sets APP_ENV
const appEnv = process.env.APP_ENV

// add app configs here
const env = envs.service[appEnv]
const env2 = envs.mediaservice[appEnv]
const env3 = envs.auth[appEnv]
const envConfigs = {
  environment: `${appEnv}`,
  uploadFile: `${env2}/buckets/{bucketName}/files`,
  deleteFile: `${env2}/buckets/{bucketName}/files/{fileName}`,
  login: `${env}/login`,
  getArticles: `${env}/articles`,
  getArticlesByCategory: `${env}/categories/retrieve/{categoryId}`,
  getChildrenCategoriesById: `${env}/categories/children/{categoryId}`,
  getTopLevelCategories: `${env}/categories/topLevel`,
  getCategoriesByArticle: `${env}/articles/categories`,
  getArticleById: `${env}/articles/{articleId}`,
  getCategories: `${env}/categories/articles`,
  deleteArticle: `${env}/articles/{articleId}`,
  submitCategory: `${env}/categories`,
  submitArticle: `${env}/articles`,
  updateArticleCategories: `${env}/articles/:id/categories`,
  updateArticle: `${env}/articles/:id`,
  updateCategory: `${env}/articles/:id/categories`,
  submitComment: `${env}/articles/comment`,
  updateArticleTags: `${env}/articles/:id/tags`,
  getArticlesByTagId: `${env}/tags/:tagId`,
  getTags: `${env}/categories/{topLevelCategoryId}/tags`,
  getCategoryByName: `${env}/categories`,
  createTag: `${env}/tags`,
  search: `${env}/search`,
  createConfiguration: `${env}/configuration`,
  getConfiguration: `${env}/configuration`,
  getConfigurationById: `${env}/configuration/:id`,
  updateConfiguration: `${env}/configuration/:id`,
  getIdeas: `${env}/categories/{topLevelCategoryId}/ideas`,
  createIdea: `${env}/ideas`,
  updateIdea: `${env}/ideas/{ideaId}`,
  deleteIdea: `${env}/ideas/{ideaId}`,
  auth: env3,
}
const apiConfig = _.merge(commonConfig, envConfigs)

export default apiConfig
