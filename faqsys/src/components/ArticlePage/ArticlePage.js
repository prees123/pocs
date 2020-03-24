import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import * as querystring from 'query-string'
import * as _ from 'lodash'
import {withStyles} from '@material-ui/core/styles'
import {Button, Grid, Paper, Typography} from '@material-ui/core'
import {ChevronLeft, Edit} from '@material-ui/icons'
import * as userInfoService from '../../services/userInfo'
import Rating from './Rating.js'
import TagFormatter from '../ArticleTable/TagFormatter'

export class ArticlePage extends React.Component {
  render () {
    const {classes} = this.props
    let createDate = new Date(this.props.article.createdAt)
    let updateDate = new Date(this.props.article.updatedAt)
    let updated
    if (this.props.article.updatedBy) {
      updated = <Typography className={classes.metaText} component="h5" color="textSecondary">Updated by {this.props.article.updatedBy} on {updateDate.toLocaleDateString()} at {updateDate.toLocaleTimeString()}</Typography>
    } else {
      updated = null
    }
    let imageTypes = ['jpg', 'jpeg', 'png', 'gif']
    let videoTypes = ['mov', 'mp4']
    let media
    if (!_.isNil(this.props.article.contentBlocks)) {
      media = (
        this.props.article.contentBlocks.map(({media, richText}) => {
          if (!media) {
            return (
              <span ng-bind-html="content" className={'ql-editor'}>
                <Typography className={classes.bodyText} variant="body1" component="div">
                  <div>
                    {ReactHtmlParser(richText)}
                  </div>
                </Typography>
              </span>
            )
          } else {
            const mediaLink = media.tossLink
            const mediaType = _.last(mediaLink.split('.'))
            const fileName = _.last(mediaLink.split('||'))
            const captionElement = (
              <Typography color="textSecondary" className={classes.captionText}>
                {media.caption}
              </Typography>
            )
            const fallbackElement = (
              <a className={classes.download} href={mediaLink} download="download">Download {fileName}
                {captionElement}
              </a>
            )
            if (imageTypes.indexOf(mediaType) !== -1) {
              return (
                <div className={classes.mediaBlock}>
                  <img className={classes.imageMedia} src={mediaLink} alt="" />
                  {captionElement}
                </div>
              )
            } else if (videoTypes.indexOf(mediaType) !== -1) {
              return (
                <div className={classes.mediaBlock}>
                  <div className={classes.playerWrapper}>
                    <ReactPlayer className={classes.videoMedia} width="100%" height="100%" controls="true" url={mediaLink} />
                    {captionElement}
                  </div>
                </div>
              )
            } else if (mediaType === 'pdf') {
              return (
                <object className={classes.pdfBlock} data={mediaLink}>
                  This browser does not support PDFs. Please download the PDF to view it.
                  {fallbackElement}
                </object>
              )
            } else {
              return (
                <div className={classes.mediaBlock}>
                  {fallbackElement}
                </div>
              )
            }
          }
        })
      )
    }
    let edit
    const qsValues = querystring.parse(this.props.location.search)
    const editLinkUrl = `/edit/article/${qsValues.articleId}/?id=${qsValues.articleId}&name=${qsValues.categoryName}`
    if (userInfoService.isMemberOf(this.props.userInfo.memberOf, this.props.adGroup)) {
      edit = <Link to={editLinkUrl}>
        <Button variant="fab" color="primary" className={classes.editBtn}><Edit /></Button>
      </Link>
    }

    let tags
    if (!_.isNil(this.props.article.tags)) {
      tags = (
        <Grid item xs={4} className={classes.tagGrid} direction="row" container>
          <span>Tags:{'\xa0'}</span>
          <TagFormatter article={this.props.article} />
        </Grid>
      )
    }

    return (<div>
      <div className={classes.backBtn}>
        <Button onClick={() => this.props.history.goBack()} color="primary"><ChevronLeft />Back to Articles</Button>
      </div>
      <div className={classes.top}>
        <Grid>
          <Paper className={classes.articlePagePaper} elevation={13}>
            <Grid item className={classes.tags}>
              {tags}
            </Grid>
            <Grid item>
              <Typography className={classes.title} variant="display1" component="h3" color="primary">{this.props.article.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.metaText} component="h5" color="textSecondary">Created by {this.props.article.createdBy} on {createDate.toLocaleDateString()} at {createDate.toLocaleTimeString()}</Typography>
              {updated}
            </Grid>
            {media}
            <Typography className={classes.bodyText} variant="body1" component="div">
              <Rating article={this.props.article} userInfo={this.props.userInfo} />
            </Typography>
            {edit}
          </Paper>
        </Grid>
      </div>
    </div>)
  }
}

function mapStateToProps (state) {
  return {userInfo: state.user, adGroup: state.configurationReducer.adGroup}
}

ArticlePage.propTypes = {
  userInfo: PropTypes.object,
  adGroup: PropTypes.string,
}

ArticlePage.defaultProps = {
  userInfo: {},
  adGroup: '',
  article: {},
}

const styles = (theme) => ({
  top: {
    paddingTop: '150px',
    marginRight: '10%',
    marginLeft: '10%',
  },
  articlePagePaper: {
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingTop: '25px',
    paddingBottom: '25px',
  },
  tagGrid: {
    direction: 'row',
    float: 'right',
  },
  tagChip: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '8px',
    margin: '.1em',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff',
    },
  },
  title: {
    padding: '0.25em',
  },
  backBtn: {
    marginRight: '10%',
    paddingTop: '100px',
    float: 'right',
  },
  metaText: {
    fontStyle: 'italic',
    fontSize: '8pt',
    marginBottom: '1em',
    paddingLeft: '0.5em',
  },
  captionText: {
    fontStyle: 'italic',
    fontSize: '12pt',
    marginBottom: '1em',
    paddingLeft: '0.5em',
    textAlign: 'center',
  },
  bodyText: {
    padding: '2em',
    paddingTop: '3em',
    fontSize: '12pt',
  },
  editBtn: {
    position: 'sticky',
    bottom: '1em',
    float: 'right',
    marginTop: '550px',
    marginLeft: '30px',
    marginRight: '30px',
  },
  imageMedia: {
    display: 'block',
    margin: '0 auto',
    marginBottom: '1em',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%',
    playerRatio: '100 / (1280 / 720)',
  },
  videoMedia: {
    position: 'absolute',
    top: '0',
    left: '0',
  },
  mediaBlock: {
    paddingTop: '3em',
  },
  pdfBlock: {
    width: '100%',
    height: '600px',
  },
  download: {
    paddingLeft: '1em',
  },
})
export default withStyles(styles)(withRouter(connect(mapStateToProps)(ArticlePage)))
