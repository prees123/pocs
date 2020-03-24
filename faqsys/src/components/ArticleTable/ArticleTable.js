import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as querystring from 'query-string'
import {withStyles} from '@material-ui/core/styles'
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@material-ui/core'
import {ChevronLeft, Delete} from '@material-ui/icons'
import * as _ from 'lodash'
import TitleFormatter from './TitleFormatter'
import DescriptionFormatter from './DescriptionFormatter'
import UpdatedByFormatter from './UpdatedByFormatter'
import MediaFormatter from './MediaFormatter'
import StatusFormatter from './StatusFormatter'
import TagFormatter from './TagFormatter'
import * as userInfoService from '../../services/userInfo'
import {deleteArticle} from '../../actions/Article/ArticleActions'
import {showNotification} from '../../actions/Notification/NotificationActions'
import DeleteConfirmation from '../Common/DeleteConfirmation'
import './styles.css'

export class ArticleTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDeleteArticleDialog: false,
      clickedArticle: {},
      columns: [],
    }
  }

  handleDeleteArticle = (clickedArticle) => {
    this.setState({
      showDeleteArticleDialog: true,
      clickedArticle,
    })
  }

  handleCloseDialog = () => {
    this.setState({
      showDeleteArticleDialog: false,
      clickedArticle: {},
    })
  }

  handleConfirmDelete = () => {
    this.props.deleteArticle(this.state.clickedArticle.id, this.props.categoryId)
    this.props.showNotification(true, `Deleted ${this.state.clickedArticle.title}`)
    this.handleCloseDialog()
  }

  getTableHeaders = () => {
    const {classes} = this.props
    let baseColumns = [
      (<TableCell padding="dense">Title</TableCell>),
      (<TableCell padding="dense">Description</TableCell>),
      (<TableCell padding="dense">Tags</TableCell>),
      (<TableCell padding="dense">Last Modified</TableCell>),
      (<TableCell padding="none" className={classes.centerAlignColumn}>Media</TableCell>),
    ]

    if (userInfoService.isMemberOf(this.props.user.memberOf, this.props.adGroup)) {
      return [
        ...baseColumns,
        (<TableCell padding="none" className={classes.centerAlignColumn}>Status</TableCell>),
        (<TableCell padding="none" />),
      ]
    } else {
      return baseColumns
    }
  }

  getTableData = (article) => {
    const {classes} = this.props
    let baseData = [
      (<TableCell padding="dense"><TitleFormatter article={article} /></TableCell>),
      (<TableCell padding="dense"><DescriptionFormatter article={article} /></TableCell>),
      (<TableCell padding="dense"><TagFormatter article={article} /></TableCell>),
      (<TableCell padding="dense"><UpdatedByFormatter article={article} /></TableCell>),
      (<TableCell padding="none" className={classes.centerAlignColumn}><MediaFormatter article={article} /></TableCell>),
    ]

    if (userInfoService.isMemberOf(this.props.user.memberOf, this.props.adGroup)) {
      return [
        ...baseData,
        (<TableCell padding="none" className={classes.centerAlignColumn}><StatusFormatter article={article} /></TableCell>),
        (<TableCell padding="none">
          <div>
            <Button onClick={() => this.handleDeleteArticle(article)}><Delete /></Button>
          </div>
        </TableCell>),
      ]
    } else {
      return baseData
    }
  }

  getTableHeading = () => {
    const qsValues = querystring.parse(_.get(this.props.location, 'search', {}))

    if (qsValues.tagName) {
      return `Showing articles tagged "${qsValues.tagName}"`
    } else if (qsValues.searchQuery) {
      return `Search Results for "${qsValues.searchQuery}"`
    } else {
      return qsValues.name
    }
  }

  render () {
    const {classes} = this.props
    return (
      <div className={classes.headerSpace}>
        <Typography className={classes.title} variant="display1" component="h3" color="primary">{this.getTableHeading()}</Typography>
        <Link to={`/home/${this.props.topLevelCategoryName}`}>
          <Button color="primary" className={classes.backButton}><ChevronLeft />Back to Categories</Button>
        </Link>
        <DeleteConfirmation
          showDialog={this.state.showDeleteArticleDialog}
          title={this.state.clickedArticle.title}
          onCancel={this.handleCloseDialog}
          onConfirm={this.handleConfirmDelete} />
        <Table>
          <TableHead>
            <TableRow>
              {this.getTableHeaders()}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.articles.map(article => (
              <TableRow hover>
                {this.getTableData(article)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapDispatchToProps = {
  deleteArticle,
  showNotification,
}

function mapStateToProps (state) {
  return {
    article: state.articleReducer.article,
    categoryId: state.category.categoryId,
    user: state.user,
    adGroup: state.configurationReducer.adGroup,
    topLevelCategoryName: state.category.topLevelCategoryName,
  }
}

ArticleTable.propTypes = {
  article: PropTypes.object,
  categoryId: PropTypes.string,
  user: PropTypes.object,
  adGroup: PropTypes.string,
  topLevelCategoryName: PropTypes.string,
}

ArticleTable.defaultProps = {
  user: {},
  adGroup: '',
  article: {},
  categoryId: '',
  topLevelCategoryName: '',
}

const styles = {
  headerSpace: {
    paddingTop: '75px',
  },

  title: {
    padding: '0.25em',
  },

  backButton: {
    float: 'right',
  },

  centerAlignColumn: {
    textAlign: 'center',
  },
}
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleTable)))
