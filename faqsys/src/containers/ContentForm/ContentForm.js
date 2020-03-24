import React from 'react'
import {connect} from 'react-redux'
import * as querystring from 'query-string'
import {getArticleById} from '../../actions/Article/ArticleActions'
import ArticleForm from '../../components/ArticleForm/ArticleForm'

class ContentForm extends React.Component {
  constructor (props) {
    super(props)
    this.quill = React.createRef()
  }

  componentDidMount () {
    const qsValues = querystring.parse(this.props.location.search)
    if (qsValues.id) {
      this.props.getArticleById(qsValues.id)
    }
  }
  render () {
    const qsValues = querystring.parse(this.props.location.search)
    let article = qsValues.id ? this.props.article : {}
    let isEditing = false
    if (qsValues.id) {
      isEditing = true
    }
    return (<div>
      <ArticleForm qsValues={qsValues} article={article} isEditing={isEditing} />
    </div>)
  }
}

function mapStateToProps (state) {
  return {article: state.articleReducer.article}
}

const mapDispatchToProps = {
  getArticleById,
}

ContentForm.defaultProps = {
  article: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentForm)
