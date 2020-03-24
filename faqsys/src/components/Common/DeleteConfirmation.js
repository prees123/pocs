import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'

class DeleteConfirmation extends React.Component {
  render () {
    const {showDialog, title, onCancel, onConfirm} = this.props
    return (
      <Dialog open={showDialog} onClose={onCancel}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <i>{title}</i> will be deleted forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={onCancel}>No, keep it</Button>
          <Button color="primary" onClick={onConfirm}>Yes, delete</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DeleteConfirmation
