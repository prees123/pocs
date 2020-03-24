import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Grid, IconButton} from '@material-ui/core'
import {ThumbDown, ThumbUp} from '@material-ui/icons'
import * as _ from 'lodash'
import {IdeaStatusEnum} from './IdeaStatus'

class Voting extends React.Component {
  THUMBS_UP_KEY = 'thumbsUp'
  THUMBS_DOWN_KEY = 'thumbsDown'

  getVoteButtonColor = (key) => {
    const {idea, user} = this.props
    return _.get(idea, key, []).indexOf(user.lanId) > -1 ? 'primary' : 'default'
  }

  handleUpvote = () => {
    this.onVote(this.THUMBS_UP_KEY, this.THUMBS_DOWN_KEY)
  }

  handleDownvote = () => {
    this.onVote(this.THUMBS_DOWN_KEY, this.THUMBS_UP_KEY)
  }

  onVote = (key, otherKey) => {
    const {idea, user, handleVote} = this.props
    const currentUser = user.lanId
    let voters = [...(idea[key]) || []]
    let otherVoters = [...(idea[otherKey]) || []]
    if (voters.includes(currentUser)) {
      voters.splice(voters.indexOf(currentUser), 1)
    } else {
      if (otherVoters.includes(currentUser)) {
        otherVoters.splice(otherVoters.indexOf(currentUser))
      }
      voters.push(currentUser)
    }
    handleVote(idea.id, {
      [key]: voters,
      [otherKey]: otherVoters,
    })
  }

  render () {
    const {idea, user, classes} = this.props
    let disabled = idea.status === IdeaStatusEnum.DONE || idea.status === IdeaStatusEnum.CANT_DO || !user.isAuthorized
    return (
      <Grid container direction="row">
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <IconButton disabled={disabled} color={this.getVoteButtonColor(this.THUMBS_UP_KEY)} onClick={this.handleUpvote}>
                <ThumbUp />
              </IconButton>
            </Grid>
            <Grid item>
              <div className={classes.voteCount}>
                {_.size(idea.thumbsUp)}
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <IconButton disabled={disabled} color={this.getVoteButtonColor(this.THUMBS_DOWN_KEY)} onClick={this.handleDownvote}>
                <ThumbDown />
              </IconButton>
            </Grid>
            <Grid item>
              <div className={classes.voteCount}>
                {_.size(idea.thumbsDown)}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const styles = {
  voteCount: {
    textAlign: 'center',
    fontSize: '13px',
    marginTop: '-10px',
  },
}

export default withStyles(styles)(Voting)
