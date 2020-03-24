import {setHeaderTitle, showAuthPopup, headerProgress} from '../../src/actions/Layout/LayoutActions'

import {SET_HEADER_TITLE, SHOW_HEADER_PROGRESS, SHOW_AUTH_POPUP} from '../../src/actions/actionTypes'

describe('layout actions', () => {
  it('should create an action to set the header title', () => {
    const data = 'ohayo gozaimasu'
    const expectedAction = {
      type: SET_HEADER_TITLE,
      headerTitle: data,
    }
    expect(setHeaderTitle(data)).toEqual(expectedAction)
  }),
  it('should create an action to show the auth popup', () => {
    const data = true
    const expectedAction = {
      type: SHOW_AUTH_POPUP,
      popupType: data,
    }
    expect(showAuthPopup(data)).toEqual(expectedAction)
  }),
  it('should create an action to show the header progress', () => {
    const data = true
    const expectedAction = {
      type: SHOW_HEADER_PROGRESS,
      isShown: data,
    }
    expect(headerProgress(data)).toEqual(expectedAction)
  })
})
