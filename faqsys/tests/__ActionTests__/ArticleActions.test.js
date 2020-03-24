import {setArticles, setArticle, setGetArticlesPending, setGetArticlesError, setGetArticlePending, setGetArticleError} from '../../src/actions/Article/ArticleActions'

import {SET_ARTICLES, SET_ARTICLE, SET_GET_ARTICLES_ERROR, SET_GET_ARTICLES_PENDING, SET_GET_ARTICLE_ERROR, SET_GET_ARTICLE_PENDING} from '../../src/actions/actionTypes'

describe('article actions', () => {
  it('should create an action to set the articles', () => {
    const data = [
      {
        "id": 515,
        "title": "Demo (captions)",
        "media": [
          {
            "tossLink": "https://toss.target.com/Merch:trellis-dev/1541512767||Z003BZT||1538758383_Z001MN5_item-level-forecasts.png",
            "imageCaption": "test 2 fgsgdsagffadsdfhkjyhtrgf"
          }
        ],
        "bodyText": "<p>This is a test of the caption component demo boop.</p>",
        "createdBy": "Emily Richmond",
        "updatedBy": "Stacia Marlett",
        "status": "LIVE",
        "thumbsUp": [],
        "thumbsDown": [],
        "createdAt": "2018-11-12T18:39:56.227Z",
        "updatedAt": "2018-11-13T18:34:44.473Z",
        "categoryId": 270
      }, {
        "id": 524,
        "title": "Test Captions",
        "media": [],
        "bodyText": "<p>testing the caption component</p>",
        "createdBy": "Emily Richmond",
        "updatedBy": "Emily Richmond",
        "status": "LIVE",
        "thumbsUp": [],
        "thumbsDown": [],
        "createdAt": "2018-11-13T16:16:37.186Z",
        "updatedAt": "2018-11-13T16:16:37.186Z",
        "categoryId": 270
      }
    ]
    const expectedAction = {
      type: SET_ARTICLES,
      articles: data
    }
    expect(setArticles(data)).toEqual(expectedAction)
  }),
  it('should create an action to set the article', () => {
    const data = [{
      "id": 524,
      "title": "Test Captions",
      "media": [],
      "bodyText": "<p>testing the caption component</p>",
      "createdBy": "Emily Richmond",
      "updatedBy": "Emily Richmond",
      "status": "LIVE",
      "thumbsUp": [],
      "thumbsDown": [],
      "createdAt": "2018-11-13T16:16:37.186Z",
      "updatedAt": "2018-11-13T16:16:37.186Z",
      "categoryId": 270
    }]
    const expectedAction = {
      type: SET_ARTICLE,
      article: data
    }
    expect(setArticle(data)).toEqual(expectedAction)
  }),
  it('should create an action to set the get articles as pending', () => {
    const data = true
    const expectedAction = {
      type: SET_GET_ARTICLES_PENDING,
      isGetArticlesPending: data
    }
    expect(setGetArticlesPending(data)).toEqual(expectedAction)
  }),
  it('should create an action to set the get articles as error', () => {
    const data = true
    const expectedAction = {
      type: SET_GET_ARTICLES_ERROR,
      isGetArticlesError: data
    }
    expect(setGetArticlesError(true)).toEqual(expectedAction)
  })
  it('should create an action to set the get article as pending', () => {
    const data = true
    const expectedAction = {
      type: SET_GET_ARTICLE_PENDING,
      isGetArticlePending: data
    }
    expect(setGetArticlePending(true)).toEqual(expectedAction)
  })
  it('should create an action to set the get article as error', () => {
    const data = true
    const expectedAction = {
      type: SET_GET_ARTICLE_ERROR,
      isGetArticleError: data
    }
    expect(setGetArticleError(true)).toEqual(expectedAction)
  })
})
