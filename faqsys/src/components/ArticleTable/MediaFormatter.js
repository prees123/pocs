import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Attachment, Collections, Image, Movie} from '@material-ui/icons'
import * as _ from 'lodash'

class MediaFormatter extends React.Component {
  render () {
    const {classes, article} = this.props
    let media = []
    if (article.contentBlocks) {
      _.forEach(article.contentBlocks, (block) => {
        if (block.media) {
          media.push(block.media)
        }
      })
    }
    let imageTypes = ['jpg', 'jpeg', 'png', 'pptx', 'gif']
    let videoTypes = ['mov', 'mp4']
    let icon
    if (_.size(media) === 1) {
      let mediaType = _.last(media[0].tossLink.split('.'))
      if (imageTypes.indexOf(mediaType) !== -1) {
        icon = <Image />
      } else if (videoTypes.indexOf(mediaType) !== -1) {
        icon = <Movie />
      } else {
        icon = <Attachment />
      }
    } else if (_.size(media) > 1) {
      icon = <Collections />
    }

    if (icon) {
      return (
        <Button className={classes.mediaBtn}>{icon}</Button>
      )
    } else {
      return null
    }
  }
}

const styles = {
  mediaBtn: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },

}
export default withStyles(styles)(MediaFormatter)
