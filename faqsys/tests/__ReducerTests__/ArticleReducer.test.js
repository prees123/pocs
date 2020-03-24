import articleReducer, {initialState} from '../../src/reducers/ArticleReducer'
import {SET_ARTICLES, SET_ARTICLE, SET_GET_ARTICLES_ERROR, SET_GET_ARTICLES_PENDING, SET_GET_ARTICLE_ERROR, SET_GET_ARTICLE_PENDING} from  '../../src/actions/actionTypes'

describe('articleReducer', () => {
  it('should handle SET_ARTICLES', () => {
    const data = {
      articles: [
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
    }
    const action = {
      type: SET_ARTICLES,
      payload: data
    }

    expect(articleReducer(initialState, action))
  }),
  it('should handle SET_ARTICLE', () => {
    const data = {
      article: [
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
      }]
    }
    const action = {
      type: SET_ARTICLE,
      payload: data
    }

    expect(articleReducer(initialState, action))
  }),
  it('should handle SET_GET_ARTICLES_PENDING', () => {
    const data = true
    const action = {
      type: SET_GET_ARTICLES_PENDING,
      payload: data
    }

    expect(articleReducer(initialState, action))
  }),
  it('should handle SET_GET_ARTICLES_ERROR', () => {
    const data = true
    const action = {
      type: SET_GET_ARTICLES_ERROR,
      payload: data
    }

    expect(articleReducer(initialState, action))
  }),
  it('should handle SET_GET_ARTICLE_PENDING', () => {
    const data = true
    const action = {
      type: SET_GET_ARTICLE_PENDING,
      payload: data
    }

    expect(articleReducer(initialState, action))
  }),
  it('should handle SET_GET_ARTICLE_ERROR', () => {
    const data = true
    const action = {
      type: SET_GET_ARTICLE_ERROR,
      payload: data
    }

    expect(articleReducer(initialState, action))
  })
})
