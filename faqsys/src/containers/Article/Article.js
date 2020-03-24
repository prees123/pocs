import React, {Component} from 'react'
import {connect} from 'react-redux'
import ArticlePage from '../../components/ArticlePage/ArticlePage'
import * as querystring from 'query-string'
import {getArticleById} from '../../actions/Article/ArticleActions'

class Article extends Component {
  constructor (props) {
    super(props)
    this.state = {
      article: props.article,
      categoryName: props.categoryName,
    }
  }
  componentDidMount () {
    const qsValues = querystring.parse(this.props.location.search)
    this.props.getArticleById(qsValues.articleId)
  }

  render () {
    return (<div>
      <ArticlePage article={this.props.article} categoryName={this.props.categoryName} />
    </div>)
  }
}

Article.defaultProps = {
  article: {},
  categoryName: '',
}
const mapDispatchToProps = {
  getArticleById}

function mapStateToProps (state) {
  return {article: state.articleReducer.article, categoryName: state.category.categoryName}
}
export default connect(mapStateToProps, mapDispatchToProps)(Article)
