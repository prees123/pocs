import React from 'react'
import {string, func, object} from 'prop-types'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import UserBar from 'react-praxis-components/UserBar'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {Add, Gesture, Home, Settings} from '@material-ui/icons'
import Notifications from '../Notifications/Notifications'
import AppHeader from '../Header/Header'
import ConfigurationPage from '../ConfigurationPage/ConfigurationPage'
import HomePage from '../../containers/HomePage/HomePage'
import SubHomePage from '../../containers/SubHomePage/SubHomePage'
import NotFound from './NotFoundPage'
import Articles from '../../containers/Articles/Articles'
import Article from '../../containers/Article/Article'
import LoginSplash from './LoginSplash'
import ContentForm from '../../containers/ContentForm/ContentForm'
import PrivateRoute from './PrivateRoute'
import * as userInfoService from '../../services/userInfo'
import configureHttpInterceptor from '../../services/httpInterceptor'
import OAuthProviderConfig from '../../config/OAuthProviderConfig'
import {OAuthProvider, getPayload, getKey} from 'react-oauth-openid'
import AuthModalContainer from '../../containers/AuthModal/AuthModal'
import SideNav, {Icon, Link, Text} from 'react-praxis-components/SideNav'
import {headerProgress, openSideNav, closeSideNav, showAuthPopup} from '../../actions/Layout/LayoutActions'
import {removeUserInfo, setUserInfo} from '../../actions/User/UserActions'
import {setErrorMessage} from '../../actions/Error/ErrorActions'
import {showAuthModal} from '../../actions/AuthModal/AuthModalActions'
import {showNotification} from '../../actions/Notification/NotificationActions'
import createHistory from 'history/createBrowserHistory'
import IdeaPage from '../../containers/IdeaPage/IdeaPage'
const history = createHistory()
export class Layout extends React.Component {
  constructor (props) {
    super(props)
    configureHttpInterceptor(headerProgress, setErrorMessage, showNotification, showAuthModal)
  }
  static propTypes = {
    classes: object,
    headerTitle: string,
    userInfo: object,
    openSideNav: func,
    closeSideNav: func,
  }

  static defaultProps = {
    classes: {},
    errorActions: {},
    headerTitle: undefined,
    layoutActions: {},
    notificationActions: {},
    userActions: {},
    authModalActions: {},
    userInfo: {
      email: undefined,
      firstName: undefined,
      fullName: undefined,
      isAuthorized: undefined,
      lanId: undefined,
      lastName: undefined,
      memberOf: undefined,
      accessToken: undefined,
    },
  }

  isUserAuthorizedForPage = () => {
    if ((userInfoService.isMemberOf(this.props.userInfo.memberOf, this.props.adGroup)) || (window.location.hostname === 'localhost')) {
      return true
    } else {
      return false
    }
  }

  handleMenuButtonClick = () => {
    if (this.props.sideNavIsOpen) {
      this.props.closeSideNav()
    } else {
      this.props.openSideNav()
    }
  }

  handleCloseSideNav = () => {
    if (this.props.sideNavIsOpen) {
      this.props.closeSideNav()
    }
  }

  onOAuthProviderLogin = () => {
    const idPayload = getPayload('id_token')
    idPayload.accessToken = getKey('access_token')
    this.props.setUserInfo(idPayload)
    this.props.showAuthModal(false)
    this.props.showNotification(true, 'You’re signed in.')
  }

  onOAuthProviderLoginFailure = (error) => {
    this.props.setErrorMessage({type: 'auth', level: 'warning', message: error.message})
    this.props.showNotification(true, error.message)
  }

  handleSignIn = () => {
    this.props.showAuthPopup('login')
  }

  handleSignOut = () => {
    window.localStorage.removeItem('accessLevel')
    this.props.removeUserInfo()
  }

  redirectUserAfterLogin = () => {
    return history.goBack('/')
  }

  render () {
    const {headerTitle, userInfo, sideNavIsOpen} = this.props
    let links = [
      (<Link key="home" to="/" exact>
        <Icon><Home /></Icon>
        <Text>Home</Text>
      </Link>),
    ]
    let addArticleLink = `/create/${this.props.topLevelCategoryName}`
    let ideasLink = `/ideas/${this.props.topLevelCategoryName}`
    if (!this.props.isMenuAndSearchFunctionalityDisabled) {
      if (this.isUserAuthorizedForPage()) {
        links.push(<Link key="article" to={addArticleLink}>
          <Icon ><Add /></Icon>
          <Text>Add Article</Text>
        </Link>)
      }
      links.push(<Link key="ideas" to={ideasLink}>
        <Icon ><Gesture /></Icon>
        <Text>Ideas</Text>
      </Link>)
    }
    if (this.isUserAuthorizedForPage()) {
      links.push(
        (<Link key="config" to="/configuration">
          <Icon ><Settings /></Icon>
          <Text>Configuration</Text>
        </Link>),
      )
    }

    return (<div>
      <Helmet defaultTitle={this.props.appName} titleTemplate="%s - {this.props.appName}" />
      <Notifications />
      <OAuthProvider config={OAuthProviderConfig} errorCallback={this.onOAuthProviderLoginFailure} popupType={this.props.popupType} showPopup={this.props.openPopup} successCallback={this.onOAuthProviderLogin} />
      <AuthModalContainer />
      <SideNav isOpen={sideNavIsOpen} onClose={this.handleCloseSideNav}>
        <UserBar classes={{root: this.props.classes.root}} displayName={userInfo.fullName} handleSignOut={this.handleSignOut} handleSignIn={this.handleSignIn} isAuthorized={userInfo.isAuthorized} />
        {links}
      </SideNav>
      <AppHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />
      <div className="contentContainer">
        <Grid container>
          <Grid item xs={12}>
            {/* routes */}
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route path="/home/:topLevelCategoryName" component={SubHomePage} />
              <Route path="/category/:topLevelCategoryName/:id" component={Articles} />
              <Route path="/tag/:tagId" component={Articles} />
              <Route path="/article/:id" component={Article} />
              <Route path="/auth/login" component={LoginSplash} />
              <PrivateRoute path="/configuration" component={ConfigurationPage} isAuthorized={this.isUserAuthorizedForPage()} />
              <PrivateRoute path="/create/:topLevelCategoryName" component={ContentForm} isAuthorized={this.isUserAuthorizedForPage()} />
              <PrivateRoute path="/edit/article/:id" component={ContentForm} isAuthorized={this.isUserAuthorizedForPage()} />
              <Route path="/search/:topLevelCategoryName" component={Articles} />
              <Route path="/ideas/:topLevelCategoryName" component={IdeaPage} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
        </Grid>
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
  headerTitle: state.layout.headerTitle,
  userInfo: state.user,
  error: state.error.message,
  openPopup: state.layout.openPopup,
  popupType: state.layout.popupType,
  sideNavIsOpen: state.layout.sideNavIsOpen,
  primaryColor: state.configurationReducer.primaryColor,
  adGroup: state.configurationReducer.adGroup,
  appName: state.configurationReducer.appName,
  isMenuAndSearchFunctionalityDisabled: state.category.isMenuAndSearchFunctionalityDisabled,
  topLevelCategoryName: state.category.topLevelCategoryName,
})
const mapDispatchToProps = {
  openSideNav,
  closeSideNav,
  removeUserInfo,
  setUserInfo,
  showAuthModal,
  showAuthPopup,
  setErrorMessage,
  showNotification,
  headerProgress}

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
})
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Layout))
