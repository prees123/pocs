import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AuthModalComponent from 'react-praxis-components/AuthModal'

export class AuthModal extends React.Component {
  render () {
    return (
      <AuthModalComponent
        handleRequestClose={this.handleRequestClose}
        handleSignIn={this.handleSignIn}
        open={this.props.authModalIsShown}
      />
    )
  }
  handleRequestClose = () => {
    this.props.authModalActions.showAuthModal(false)
  }

  handleSignIn = () => {
    this.props.layoutActions.showAuthPopup('login')
  }
}

function mapStateToProps (state) {
  return {
    authModalIsShown: state.authModal.isShown,
  }
}

AuthModal.propTypes = {
  authModalActions: PropTypes.shape({
    showAuthModal: PropTypes.func,
  }),
  authModalIsShown: PropTypes.bool,
  layoutActions: PropTypes.shape({
    showAuthPopup: PropTypes.func,
  }),
}

AuthModal.defaultProps = {
  authModalActions: undefined,
}

export default connect(mapStateToProps)(AuthModal)
