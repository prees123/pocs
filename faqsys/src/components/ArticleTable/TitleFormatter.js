import React from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

class TitleFormatter extends React.Component {
  render () {
    const {article, classes} = this.props
    const linkUrl = `/article/${article.id}?articleId=${article.id}&articleTitle=${article.title}`
    return (<div>
      <Link to={linkUrl} style={{textDecoration: 'none'}}>
        <div className={classes.link}>{article.title}</div>
      </Link>
    </div>)
  }
}

const styles = {
  link: {
    color: 'blue',
    textDecoration: 'none',
  },
}

export default withStyles(styles)(TitleFormatter)
