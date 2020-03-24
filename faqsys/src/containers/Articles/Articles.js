import React, {Component} from 'react'
import {getArticles, getArticlesByTagId} from '../../actions/Article/ArticleActions'
import {connect} from 'react-redux'
import ArticleTable from '../../components/ArticleTable/ArticleTable'
import * as userInfoService from '../../services/userInfo'
import * as querystring from 'query-string'

class Articles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categoryId: '',
      articles: props.articles,
      categoryName: '',
      userInfo: props.userInfo,
    }
  }

  componentDidMount () {
    const qsValues = querystring.parse(this.props.location.search)
    const live = !userInfoService.isMemberOf(this.props.userInfo.memberOf, this.props.adGroup)
    if (qsValues.tagId) {
      this.props.getArticlesByTagId(qsValues.tagId, live)
    } else if (qsValues.id) {
      this.props.getArticles(qsValues.id, live)
    }
  }

  render () {
    return (<div>
      <ArticleTable articles={this.props.articles} />
    </div>)
  }
}

Articles.defaultProps = {
  classes: {},
  articles: {},
  userInfo: '',
}

const mapDispatchToProps = {
  getArticles,
  getArticlesByTagId,
}

function mapStateToProps (state) {
  return {
    articles: state.articleReducer.articles,
    categoryId: state.category.categoryId,
    categoryName: state.category.categoryName,
    userInfo: state.user,
    adGroup: state.configurationReducer.adGroup,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
