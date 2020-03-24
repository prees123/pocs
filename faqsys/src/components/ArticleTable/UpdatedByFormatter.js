import React from 'react'

class UpdatedByFormatter extends React.Component {
  render () {
    const {article} = this.props
    let date = new Date()
    if (!article.updatedBy) {
      date = new Date(article.createdAt)
    } else {
      date = new Date(article.updatedAt)
    }
    return (<div>
      {date.toLocaleDateString()}
    </div>)
  }
}

export default UpdatedByFormatter
