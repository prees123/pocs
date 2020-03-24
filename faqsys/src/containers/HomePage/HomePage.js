import React from 'react'
import {Helmet} from 'react-helmet'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import HeaderTitle from '../../components/Header/HeaderTitle'
import TopLevelCategories from '../Categories/TopLevelCategories'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
class HomePage extends React.Component {
  render () {
    const {classes} = this.props
    let productImage
    if (!this.props.productImage) {
      productImage = null
    } else {
      productImage = <img className={classes.ivyPromo} alt="Product" src={this.props.productImage} />
    }
    return (<div className={classes.homePage}>
      <HeaderTitle title={this.props.appName} />
      <Helmet>
        <title>{this.props.headerTitle}</title>
      </Helmet>
      <div className={classes.welcomeContainer}>
        <Paper className={classes.homepaper} elevation={1}>
          <div className={classes.welcomeBanner}>
            <Typography className={classes.welcomeHeadline} variant="headline">
              {this.props.productDescription}
            </Typography>
            {productImage}
            <TopLevelCategories />
          </div>
          <div className={classes.backgroundColor}>
            <img className={classes.splashImage} alt="Splash" src={this.props.backgroundImage} />
          </div>
        </Paper>
      </div>
    </div>)
  }
}

function mapStateToProps (state) {
  return {
    backgroundImage: state.configurationReducer.backgroundImage,
    appName: state.configurationReducer.appName,
    productImage: state.configurationReducer.productImage,
    productDescription: state.configurationReducer.productDescription,
  }
}
const styles = (theme) => ({

  homePage: {
    textAlign: 'center',
  },
  homePageIntro: {
    fontSize: 'large',
  },
  ivyPromo: {
    width: '350px',
  },
  homepaper: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 80px)',
    justifyContent: 'center',
    position: 'relative',
  },
  splashImage: {
    flex: 1,
  },
  welcomeBanner: {
    backgroundColor: 'white',
    minHeight: '200px',
    position: 'absolute',
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    marginTop: '10%',
  },
  welcomeContainer: {
    overflowX: 'hidden',
    padding: '1em',
  },
  welcomeHeadline: {
    paddingBottom: '25px',
  },
  app: {
    textAlign: 'center',
  },
  adminOptions: {
    bottom: '0',
    left: '0',
    display: 'block',
    height: '50px',
    position: 'absolute',
    width: '100%',
  },
  text: {
    borderRadius: 'inherit',
    color: 'black',
    fontSize: '0.875rem',
    minHeight: '4.5em',
    overflow: 'hidden',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    padding: '1em',
  },
  backgroundColor: {
    backgroundColor: theme.palette.accent.main,
    width: '100%',
    height: '100%',
  },
})

export default withStyles(styles)(connect(mapStateToProps)(HomePage))
