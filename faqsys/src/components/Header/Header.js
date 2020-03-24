import React from 'react'
import { object, string, func } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import Logo from './Logo'
import {connect} from 'react-redux'
import SearchBar from './SearchBar.js'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import { appBarStyles } from 'react-praxis-components/SecondaryNav'
export class Header extends React.Component {
  render () {
    const {classes, menuAction} = this.props
    let logo
    if (this.props.logoImage !== '' || typeof this.props.logoImage === 'undefined') {
      logo = (<Link to="/"><Logo /></Link>)
    } else {
      logo = null
    }
    return (<div>
      <AppBar>
        <Toolbar>
          { menuAction && (
            <IconButton onClick={menuAction} classes={{ root: classes.button }} aria-label="Menu">
              <MenuIcon />
            </IconButton>
          ) }
          {logo}
          <Typography component={Link} to="/" className={classes.appTitle} variant="title" color="inherit">{this.props.appName}</Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </div>)
  }
}

Header.propTypes = {
  classes: object,
  title: string.isRequired,
  menuAction: func,
}

Header.defaultProps = {
  classes: {},
  headerTitle: undefined,
}

function mapStateToProps (state) {
  return {
    headerTitle: state.layout.headerTitle,
    logoImage: state.configurationReducer.logoImage,
    appName: state.configurationReducer.appName,
  }
}

const styles = {
  appBar: {
    ...appBarStyles,
  },
  appTitle: {
    textDecoration: 'none',
    flexGrow: '1',
  },
  button: {
    color: 'white',
  },

}
export default withStyles(styles)(connect(mapStateToProps)(Header))
