
import {SHOW_AUTH_MODAL} from '../../src/actions/actionTypes'
import {showAuthModal} from '../../src/actions/AuthModal/AuthModalActions'

describe('auth modal actions', () => {
  it('should show auth modal ', () => {
    const data = true
    const expectedAction = {
      type: SHOW_AUTH_MODAL,
      isShown: data
    }
    expect(showAuthModal(data)).toEqual(expectedAction)
  })
})
