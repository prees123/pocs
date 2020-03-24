import React from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import * as _ from 'lodash'

export const TopLevelCategoryTiles = (props) => {
  function categoryButtons () {
    const {classes} = props
    if (_.isEmpty(props.categories)) {
      return (<div>
        <Grid>
          <Button variant="outlined">Top level categories Not Found</Button>
        </Grid>
      </div>)
    } else {
      return (<div>
        <Grid className={classes.grid} container justify="center" alignItems="center" spacing={16}>
          {
            Object.keys(props.categories).map(function (id, name) {
              const categoryId = props.categories[id].id
              let categoryName = props.categories[id].name
              if (categoryName.includes('&')) {
                categoryName = categoryName.replace('&', 'and')
              }
              const linkUrl = `/home/${categoryName}`
              return (<Grid item xs={4}>
                <Link className={classes.categoryBtn} to={linkUrl}>
                  <Button onClick={() => handleClick(categoryId, props.categories[id].name)} className={classes.categoryBtn} variant="outlined" key={id}>{props.categories[id].name}</Button>
                </Link>
              </Grid>)
            })
          }
        </Grid>
      </div>)
    }
  }
  return (categoryButtons())

  function handleClick (id, name, e) {
    props.onButtonClick(id, name)
  }
}

const styles = (theme) => ({
  categoryBtn: {
    color: '#00000',
    backgroundColor: 'white',
    width: '100%',
    height: '110px',
    borderRadius: '7',
    fontSize: '15pt',
    textTransform: 'none',
    textDecoration: 'none',
    borderColor: 'black',
    '& :hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '& :hover *': {
      color: '#ffffff',
      boxShadow: 'initial',
    },
  },
  grid: {
    paddingTop: '20px',
  },
})
export default withStyles(styles)(withRouter(TopLevelCategoryTiles))
