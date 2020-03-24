import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import * as constants from '../../constants/constants'

class StatusFormatter extends React.Component {
  render () {
    let color
    const {classes} = this.props
    const status = this.props.article.status
    if (status === constants.articleStatusValues.live) {
      color = '#202020'
    } else if (status === constants.articleStatusValues.draft) {
      color = '#3FB7F3'
    }
    return (
      <div className={classes.progress} style={{backgroundColor: color}}>
        <div className={classes.progressBar} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="80" style={{width: 80}}>
          {status}
        </div>
      </div>)
  }
}

const styles = {
  progress: {
    display: 'inline-block',
    verticalAlign: 'baseline',
    height: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    overflow: 'hidden',
    backgroundColor: '#026549',
    borderRadius: '4px',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, .1)',
  },

  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: '#ffffff',
    textAlign: 'center',
  },
}

export default withStyles(styles)(StatusFormatter)
