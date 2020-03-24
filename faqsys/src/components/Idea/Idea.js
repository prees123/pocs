import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Grid, IconButton, Paper, SvgIcon, Typography} from '@material-ui/core'
import {Delete, Edit} from '@material-ui/icons'
import * as userInfoService from '../../services/userInfo'
import {deleteIdea, updateIdea} from '../../actions/Idea/IdeaActions'
import IdeaStatus, {IdeaStatusEnum} from './IdeaStatus'
import Voting from './Voting'
import IdeaModal from './IdeaModal'
import DeleteConfirmation from '../Common/DeleteConfirmation'

class Idea extends React.Component {
  state = {
    ideaModalOpen: false,
    showDeleteIdeaDialog: false,
    clickedIdea: {},
  }

  addEditorInfo = (type, name, date) => {
    return name ? `${type} by ${name} on ${new Date(date).toLocaleDateString()} at ${new Date(date).toLocaleTimeString()}` : null
  }

  handleDeleteIdea = (clickedIdea) => {
    this.setState({
      showDeleteIdeaDialog: true,
      clickedIdea,
    })
  }

  handleCloseDialog = () => {
    this.setState({
      showDeleteIdeaDialog: false,
      clickedIdea: {},
    })
  }

  handleConfirmDeleteIdea = () => {
    this.props.deleteIdea(this.state.clickedIdea)
    this.handleCloseDialog()
  }

  handleOpenIdeaModal = () => {
    this.setState({
      ideaModalOpen: true,
    })
  }

  handleCloseIdeaModal = () => {
    this.setState({
      ideaModalOpen: false,
    })
  }

  render () {
    const {classes, idea, user, adGroup} = this.props
    let isEditAllowed = idea.status !== IdeaStatusEnum.DONE && user.isAuthorized && userInfoService.isMemberOf(user.memberOf, adGroup)
    return (
      <Paper className={classes.ideaPaper} elevation={5}>
        <Grid container direction="column">
          <Grid item xs={12} container justify="space-between" direction="row">
            <Grid item xs={8}>
              <Typography className={classes.title} variant="title" component="h3" color="inherit">
                {idea.title}
              </Typography>
              <Typography className={classes.metaText} variant="caption" component="h6" color="textSecondary">
                {this.addEditorInfo('added', idea.createdBy, idea.createdAt)}
                <br />
                {this.addEditorInfo('last updated', idea.updatedBy, idea.updatedAt)}
              </Typography>
            </Grid>
            <Grid item xs={2} container className={classes.ideaButtons}>
              <Grid item>
                <IconButton color="default" onClick={() => this.handleDeleteIdea(idea)} disabled={!isEditAllowed}>
                  { isEditAllowed ? <Delete /> : <SvgIcon /> }
                </IconButton>
                <DeleteConfirmation
                  showDialog={this.state.showDeleteIdeaDialog}
                  title={this.state.clickedIdea.title}
                  onCancel={this.handleCloseDialog}
                  onConfirm={this.handleConfirmDeleteIdea} />
              </Grid>
              <Grid item>
                <IconButton color="primary" onClick={this.handleOpenIdeaModal} disabled={!isEditAllowed}>
                  { isEditAllowed ? <Edit /> : <SvgIcon /> }
                </IconButton>
                <IdeaModal idea={idea} mode="edit" open={this.state.ideaModalOpen} handleClose={this.handleCloseIdeaModal} />
              </Grid>
            </Grid>
            <Grid item xs={2} container direction="column">
              <Grid item>
                <IdeaStatus status={idea.status} />
              </Grid>
              <Grid item>
                <Voting idea={idea} user={user} handleVote={this.props.updateIdea} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1" component="div">
              {idea.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

const mapDispatchToProps = {
  updateIdea,
  deleteIdea,
}

const mapStateToProps = (state) => ({
  user: state.user,
  adGroup: state.configurationReducer.adGroup,
})

const styles = {
  ideaPaper: {
    padding: '25px',
    margin: '25px',
    marginLeft: '50px',
    maxWidth: '60%',
  },
  ideaButtons: {
    marginTop: '-15px',
  },
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Idea))
