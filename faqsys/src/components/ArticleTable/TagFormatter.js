import React from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {getArticlesByTagId} from '../../actions/Article/ArticleActions'

class TagFormatter extends React.Component {
  render () {
    const {classes} = this.props
    const tags = this.props.article.tags
    return (
      <div>
        {tags.map((tag, i) => [
          <div className={classes.tagRow}>
            <Link to={`/tag/${tag.id}?tagId=${tag.id}&tagName=${tag.name}`}
              onClick={() => this.props.getArticlesByTagId(tag.id, true)}>
              <div className={classes.tagLink}>
                {tag.name}
              </div>
            </Link>
          </div>,
          i < tags.length - 1 && ', ',
        ])}
      </div>
    )
  }
}

const styles = {
  tagRow: {
    display: 'inline-block',
  },
  tagLink: {
    color: 'blue',
    textDecoration: 'none',
    display: 'inline-block',
  },
}
const mapDispatchToProps = {
  getArticlesByTagId,
}

export default withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(TagFormatter)))
