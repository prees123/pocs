import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {withRouter} from 'react-router-dom'
import {getColor} from '../actions/Configuration/ConfigurationActions'
import * as _ from 'lodash'
export class ThemeWrapperComponent extends Component {
  constructor (props) {
    super(props)
    props.getColor()
  }

  componentDidUpdate () {
    this.props.getColor()
  }
  render () {
    let primaryColor
    if (!_.isNil(this.props.primaryColor)) {
      primaryColor = this.props.primaryColor
    } else {
      primaryColor = '#000000'
    }
    let secondaryColor
    if (!_.isNil(this.props.secondaryColor)) {
      secondaryColor = this.props.secondaryColor
    } else {
      secondaryColor = '#000000'
    }
    let backgroundColor
    if (!_.isNil(this.props.backgroundColor)) {
      backgroundColor = this.props.backgroundColor
    } else {
      backgroundColor = '#000000'
    }
    return (<MuiThemeProvider theme={createMuiTheme({
      palette: {
        primary: {
          main: primaryColor,
        },
        secondary: {
          main: secondaryColor,
        },
        accent: {
          main: backgroundColor,
        },
        textSecondary: {
          main: '#d3d3d3',
        },
      },
    })}>
      <div>
        {this.props.children}
      </div>
    </MuiThemeProvider>)
  }
}
const mapDispatchToProps = {
  getColor}

function mapStateToProps (state) {
  return {
    primaryColor: state.configurationReducer.primaryColor,
    secondaryColor: state.configurationReducer.secondaryColor,
    backgroundColor: state.configurationReducer.backgroundColor,
  }
}
export const ThemeWrapper = withRouter(connect(mapStateToProps, mapDispatchToProps)(ThemeWrapperComponent))
