import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import * as _ from 'lodash'
import {IdeaStatusDisplayEnum} from './IdeaStatus'
import {updateIdea, createIdea} from '../../actions/Idea/IdeaActions'

class IdeaModal extends React.Component {
  state = {
    idea: _.assign({}, this.props.idea),
  }

  isEditMode = () => {
    return this.props.mode === 'edit'
  }

  handleStatusChange = ({target}) => {
    this.setState(prevState => ({
      idea: _.assign(prevState.idea, { status: target.value }),
    }))
  }

  handleTitleChange = ({target}) => {
    this.setState(prevState => ({
      idea: _.assign(prevState.idea, { title: target.value }),
    }))
  }

  handleDescriptionChange = ({target}) => {
    this.setState(prevState => ({
      idea: _.assign(prevState.idea, { description: target.value }),
    }))
  }

  onClose = () => {
    this.setState({
      idea: _.assign({}, this.props.idea),
    })
    this.props.handleClose()
  }

  onSave = () => {
    const {idea} = this.state
    const {fullName: userName} = this.props.user
    if (this.isEditMode()) {
      this.props.updateIdea(idea.id, {
        status: idea.status,
        updatedBy: userName,
      })
    } else {
      _.assign(idea, {
        createdBy: userName,
      })
      this.props.createIdea(idea)
    }
    this.onClose()
  }

  render () {
    const {open, classes} = this.props
    const {idea} = this.state
    let getHelperTextNode = (text, content, maxLength) => {
      return (
        <Grid container direction="row" justify="space-between" component="span">
          <Grid item component="span">
            {text}
          </Grid>
          <Grid item component="span">
            {content.length} / {maxLength}
          </Grid>
        </Grid>
      )
    }
    return (
      <Dialog open={open} onClose={this.onClose} fullWidth maxWidth="sm">
        <DialogTitle disableTypography>
          <Typography variant="title">
            {this.isEditMode() ? 'Manage' : 'Add'} Idea
          </Typography>
          <IconButton aria-label="Close" className={classes.closeButton} onClick={this.onClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={16}>
            <Grid item className={!this.isEditMode() ? classes.hideStatus : ''}>
              <FormControl className={classes.statusSelect}>
                <InputLabel htmlFor="state">State</InputLabel>
                <Select
                  value={idea.status}
                  onChange={this.handleStatusChange}
                  input={<Input id="state" />}
                  renderValue={selected => IdeaStatusDisplayEnum[selected]}
                >
                  {_.toPairs(IdeaStatusDisplayEnum).map(statusTuple => (
                    <MenuItem key={statusTuple[0]} value={statusTuple[0]}>
                      <ListItemText primary={statusTuple[1]} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                required
                disabled={this.isEditMode()}
                label="Title"
                helperText={getHelperTextNode('Be enticing!', idea.title, 50)}
                value={idea.title}
                onChange={this.handleTitleChange}
                inputProps={{
                  'maxLength': '50',
                }}
                className={classes.titleField}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                disabled={this.isEditMode()}
                multiline
                label="Description"
                helperText={getHelperTextNode('Provide an example and any money or time savings.', idea.description, 1000)}
                value={idea.description}
                onChange={this.handleDescriptionChange}
                inputProps={{
                  'maxLength': '1000',
                }}
                className={classes.descriptionField}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose} color="default">
            Cancel
          </Button>
          <Button onClick={this.onSave} color="primary">
            {this.isEditMode() ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapDispatchToProps = { updateIdea, createIdea }

const mapStateToProps = (state) => ({
  user: state.user,
})

const styles = {
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
  },
  statusSelect: {
    width: '40%',
  },
  titleField: {
    width: '80%',
  },
  descriptionField: {
    width: '80%',
  },
  hideStatus: {
    display: 'none',
  },
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IdeaModal))
