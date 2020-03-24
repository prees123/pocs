import React from 'react'
import {withStyles} from '@material-ui/core'
import * as _ from 'lodash'

const IdeaStatus = (props) => {
  const {status, classes} = props
  return (
    <div className={`${classes.ideaStatus} ${classes[_.camelCase(status) + 'Status']}`}>
      {IdeaStatusDisplayEnum[status]}
    </div>
  )
}

const styles = {
  ideaStatus: {
    width: '100px',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    border: 'solid',
    borderWidth: '1px',
  },
  assessingStatus: {
    color: '#000000',
    borderColor: '#000000',
  },
  willDoStatus: {
    color: '#BB27DD',
    borderColor: '#BB27DD',
  },
  cantDoStatus: {
    color: '#CE0B24',
    borderColor: '#CE0B24',
  },
  doneStatus: {
    color: '#B9E88B',
    borderColor: '#B9E88B',
  },
}

export const IdeaStatusEnum = {
  ASSESSING: 'ASSESSING',
  WILL_DO: 'WILL_DO',
  CANT_DO: 'CANT_DO',
  DONE: 'DONE',
}

export const IdeaStatusDisplayEnum = {
  ASSESSING: 'assessing',
  WILL_DO: 'will do!',
  CANT_DO: 'can\'t do',
  DONE: 'done!',
}

export default withStyles(styles)(IdeaStatus)
