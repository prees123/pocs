import React from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {SketchPicker} from 'react-color'
import 'react-quill/dist/quill.snow.css'
import Typography from '@material-ui/core/Typography'
import {updateConfiguration, getColor, setPrimaryColor, setSecondaryColor, setBackgroundColor, setBackgroundImage, setLogoImage, setProductDescription, setProductImage, setAppName, setAdGroup, setTossBucket, setTossTenant} from '../../actions/Configuration/ConfigurationActions'
import {withStyles} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

class ConfigurationPage extends React.Component {
  handlePrimaryColor = (color) => {
    this.props.setPrimaryColor(color.hex)
    let form = {
      primaryColor: color.hex,
    }
    this.props.updateConfiguration(form)
  }
  handleSecondaryColor = (color) => {
    this.props.setSecondaryColor(color.hex)
    let form = {
      secondaryColor: color.hex,
    }
    this.props.updateConfiguration(form)
  }
  handleBackgroundColor = (color) => {
    this.props.setBackgroundColor(color.hex)
    let form = {
      backgroundColor: color.hex,
    }
    this.props.updateConfiguration(form)
  }
  handleBackgroundImage = (event) => {
    this.props.setBackgroundImage(event.target.value)
    let form = {
      backgroundImage: event.target.value,
    }
    this.props.updateConfiguration(form)
  }
  handleLogoImage = (event) => {
    this.props.setLogoImage(event.target.value)
    let form = {
      logoImage: event.target.value,
    }
    this.props.updateConfiguration(form)
  }
  handleProductDescription = (event) => {
    this.props.setProductDescription(event.target.value)
    let form = {
      productDescription: event.target.value,
    }
    this.props.updateConfiguration(form)
  }
  handleProductImage = (event) => {
    this.props.setProductImage(event.target.value)
    let form = {
      productImage: event.target.value,
    }
    this.props.updateConfiguration(form)
  }
  handleAppName = (event) => {
    this.props.setAppName(event.target.value)
    let form = {
      appName: event.target.value,
    }
    this.props.updateConfiguration(form)
  }
  handleADGroup = (event) => {
    this.props.setAdGroup(event.target.value)
    let form = {
      adGroup: event.target.value,
    }
    this.props.updateConfiguration(form)
  }
  handleTOSSBucket = (event) => {
    this.props.setTossBucket(event.target.value)
    let form = {
      tossBucket: event.target.value,
    }
    this.props.updateConfiguration(form)
  }
  handleTOSSTenant = (event) => {
    this.props.setTossTenant(event.target.value)
    let form = {
      tossTenant: event.target.value,
    }
    this.props.updateConfiguration(form)
  }
  render () {
    const {classes} = this.props
    return (<Grid container className="articleRoot">
      <Grid item xs={12}>
        <Grid container spacing={16} className="formContent">
          <Paper className="formPaper" elevation={22}>
            <Typography color="primary" className={classes.titleLabel}>
              Application Configuration
            </Typography>
            <Tooltip title="App Title" aria-label="App Title">
              <TextField value={this.props.appName} className={classes.textField} label="App Name" type="text" onChange={(e) => this.handleAppName(e)} />
            </Tooltip>
            <div />
            <Tooltip title="AD group with access to OAuth client id" aria-label="AD group with access to OAuth client id">
              <TextField value={this.props.adGroup} className={classes.textField} label="AD Group" type="text" onChange={(e) => this.handleADGroup(e)} />
            </Tooltip>
            <div />
            <Tooltip title="TOSS bucket name prefix" aria-label="TOSS bucket name prefix">
              <TextField value={this.props.tossBucket} className={classes.textField} label="TOSS Bucket" type="text" onChange={(e) => this.handleTOSSBucket(e)} />
            </Tooltip>
            <div />
            <Tooltip title="TOSS tenant" aria-label="TOSS tenant">
              <TextField value={this.props.tossTenant} className={classes.textField} label="TOSS Tenant" type="text" onChange={(e) => this.handleTOSSTenant(e)} />
            </Tooltip>
            <div />
            <Tooltip title="Logo image url" aria-label="Logo image url">
              <TextField value={this.props.logoImage} className={classes.textField} label="Logo URL" type="text" onChange={(e) => this.handleLogoImage(e)} />
            </Tooltip>
            <div />
            <Tooltip title="Product description" aria-label="Product description">
              <TextField value={this.props.productDescription} className={classes.textField} label="Product Description" type="text" onChange={(e) => this.handleProductDescription(e)} />
            </Tooltip>
            <div />
            <Tooltip title="Product image url" aria-label="Product image url">
              <TextField value={this.props.productImage} className={classes.textField} label="Product Image URL" type="text" onChange={(e) => this.handleProductImage(e)} />
            </Tooltip>
            <div />
            <Tooltip title="Background image url" aria-label="Background image url">
              <TextField value={this.props.backgroundImage} className={classes.textField} label="Background Image URL" type="text" onChange={(e) => this.handleBackgroundImage(e)} />
            </Tooltip>
            <Tooltip title="Background color if image not selected" aria-label="Background color if image not selected">
              <Typography color="primary" className={classes.sectionLabel}>
                Background Color
              </Typography>
            </Tooltip>
            <SketchPicker className={classes.colorPicker} color={this.props.backgroundColor} onChangeComplete={this.handleBackgroundColor} />
            <Tooltip title="Primary color" aria-label="Primary color">
              <Typography color="primary" className={classes.sectionLabel}>
                Primary Color
              </Typography>
            </Tooltip>
            <SketchPicker className={classes.colorPicker} color={this.props.primaryColor} onChangeComplete={this.handlePrimaryColor} />
            <div>
              <Tooltip title="Secondary color" aria-label="Secondary color">
                <Typography color="primary" className={classes.sectionLabel}>
                  Secondary Color
                </Typography>
              </Tooltip>
            </div>
            <SketchPicker className={classes.colorPicker} color={this.props.secondaryColor} onChangeComplete={this.handleSecondaryColor} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>)
  }
}

function mapStateToProps (state) {
  return {
    primaryColor: state.configurationReducer.primaryColor,
    secondaryColor: state.configurationReducer.secondaryColor,
    backgroundColor: state.configurationReducer.backgroundColor,
    backgroundImage: state.configurationReducer.backgroundImage,
    logoImage: state.configurationReducer.logoImage,
    productDescription: state.configurationReducer.productDescription,
    productImage: state.configurationReducer.productImage,
    appName: state.configurationReducer.appName,
    adGroup: state.configurationReducer.adGroup,
    tossBucket: state.configurationReducer.tossBucket,
    tossTenant: state.configurationReducer.tossTenant,
  }
}

const mapDispatchToProps = {
  updateConfiguration,
  getColor,
  setPrimaryColor,
  setSecondaryColor,
  setBackgroundColor,
  setBackgroundImage,
  setLogoImage,
  setProductDescription,
  setProductImage,
  setAppName,
  setAdGroup,
  setTossBucket,
  setTossTenant,
}

const styles = {
  textField: {
    marginBottom: '2em',
    marginTop: '2em',
    width: '40%',
  },
  titleLabel: {
    width: '100%',
    fontSize: '28px !important',
    paddingBottom: '1em',
    fontStyle: 'bold',
  },
  sectionLabel: {
    fontStyle: 'bold',
    fontSize: '18px !important',
    paddingBottom: '1em',
  },
  colorPicker: {
    marginBottom: '2em',
  },
  help: {
    color: 'black',
    marginLeft: '5px',
  },
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage))
