import React from 'react'
import * as _ from 'lodash'

class DescriptionFormatter extends React.Component {
  render () {
    const {article} = this.props
    let body = ''
    if (article.description) {
      body = article.description
    } else if (article.contentBlocks) {
      _.forEach(article.contentBlocks, (block) => {
        if (block.richText) {
          body = body + block.richText
        }
      })
    }
    return (
      <div>
        {body.substring(0, 100).replace(/(<([^>]+)>)/ig, ' ')}
      </div>
    )
  }
}

export default DescriptionFormatter
