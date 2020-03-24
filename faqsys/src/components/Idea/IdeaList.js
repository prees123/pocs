import React from 'react'
import {withStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Idea from './Idea'

const IdeaList = (props) => {
  const {classes, ideas} = props
  return (
    <div className={classes.top}>
      <Grid>
        {ideas.map(idea => <Idea key={idea.id} idea={idea} />)}
      </Grid>
    </div>
  )
}

const styles = {
  top: {
    paddingTop: '0px',
  },
}

export default withStyles(styles)(IdeaList)
