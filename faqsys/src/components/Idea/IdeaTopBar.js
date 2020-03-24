import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import * as _ from 'lodash'
import {IdeaStatusDisplayEnum, IdeaStatusEnum} from './IdeaStatus'
import IdeaModal from './IdeaModal'

class IdeaTopBar extends React.Component {
  DEFAULT_SELECTION = [..._.values(IdeaStatusEnum), null]

  state = {
    selectedStatusFilters: this.DEFAULT_SELECTION,
    searchQuery: '',
    ideaModalOpen: false,
    stateSelectOpen: false,
    newIdea: {
      status: IdeaStatusEnum.ASSESSING,
      title: '',
      description: '',
      topLevelCategoryId: this.props.topLevelCategoryId,
    },
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

  handleOpenStateSelect = () => {
    this.setState({
      stateSelectOpen: true,
    })
  }

  handleCloseStateSelect = () => {
    this.setState({
      stateSelectOpen: false,
    })

    if (_.isEmpty(this.state.selectedStatusFilters)) {
      this.setState({
        selectedStatusFilters: this.DEFAULT_SELECTION,
      })
    }
  }

  handleStatusFilterChange = ({target}) => {
    let currentSelection = target.value
    const {selectedStatusFilters: previousSelection} = this.state
    if (_.difference(previousSelection, currentSelection).indexOf(null) > -1) {
      currentSelection = []
    } else if (_.difference(currentSelection, previousSelection).indexOf(null) > -1 || _.compact(currentSelection).length === 4) {
      currentSelection = this.DEFAULT_SELECTION
    } else if (_.compact(currentSelection).length < 4) {
      currentSelection = _.compact(currentSelection)
    }
    this.setState({
      selectedStatusFilters: currentSelection,
    })
    return this.props.onFilter(this.state.searchQuery, currentSelection)
  }

  areAllStatusSelected = () => {
    return this.state.selectedStatusFilters.length === 5
  }

  isStatusChecked = (value) => {
    if (value) {
      return this.areAllStatusSelected() || this.state.selectedStatusFilters.indexOf(value) > -1
    } else {
      return this.areAllStatusSelected()
    }
  }

  getStatusFiltersDisplay = () => {
    if (this.areAllStatusSelected()) {
      return 'All states'
    } else {
      return _.join(_.map(this.state.selectedStatusFilters, s => IdeaStatusDisplayEnum[s]), ', ')
    }
  }

  handleSearchQueryChange = ({target}) => {
    this.setState({
      searchQuery: target.value,
    })
    return this.props.onFilter(target.value, this.state.selectedStatusFilters)
  }

  render () {
    const {classes} = this.props
    return (
      <Paper className={classes.ideaTopBar} elevation={1}>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={8} container direction="column">
            <Grid item>
              <div className={classes.hintText}>
                Want to share your feedback? Have an idea for a feature that will make your job easier?<br />
                Log in from the navigation menu and add your ideas here for the product team to review.
              </div>
            </Grid>
            <Grid item container direction="row" justify="space-between" className={classes.filtersGrid}>
              <Grid item xs={6}>
                <Input
                  className={classes.searchInput}
                  placeholder="Search"
                  value={this.state.searchQuery}
                  onChange={this.handleSearchQueryChange} />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-filter">Filter</InputLabel>
                  <Select
                    className={classes.stateSelect}
                    multiple
                    value={this.state.selectedStatusFilters}
                    open={this.state.stateSelectOpen}
                    onChange={this.handleStatusFilterChange}
                    onOpen={this.handleOpenStateSelect}
                    onClose={this.handleCloseStateSelect}
                    input={<Input className={classes.stateSelectInput} id="select-filter" />}
                    renderValue={this.getStatusFiltersDisplay}
                  >
                    <MenuItem key="select-all" value={null}>
                      <Checkbox color="primary" checked={this.areAllStatusSelected()} />
                      <ListItemText primary="All states" />
                    </MenuItem>
                    {statusFilterValues.map(filter => (
                      <MenuItem key={filter.display} value={filter.value}>
                        <Checkbox color="primary" checked={this.isStatusChecked(filter.value)} />
                        <ListItemText primary={filter.display} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Tooltip
              title="Log in to add"
              placement="left"
              disableFocusListener
              disableTouchListener
              disableHoverListener={this.props.userInfo.isAuthorized}>
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!this.props.userInfo.isAuthorized}
                  onClick={this.handleOpenIdeaModal}>
                  <Add />
                  Add new idea
                </Button>
              </span>
            </Tooltip>
            <IdeaModal
              idea={this.state.newIdea}
              mode="create"
              open={this.state.ideaModalOpen}
              handleClose={this.handleCloseIdeaModal}
            />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

function mapStateToProps (state) {
  return {
    topLevelCategoryId: state.category.topLevelCategoryId,
    userInfo: state.user,
  }
}
const statusFilterValues = [
  { display: IdeaStatusDisplayEnum.ASSESSING, value: IdeaStatusEnum.ASSESSING },
  { display: IdeaStatusDisplayEnum.WILL_DO, value: IdeaStatusEnum.WILL_DO },
  { display: IdeaStatusDisplayEnum.CANT_DO, value: IdeaStatusEnum.CANT_DO },
  { display: IdeaStatusDisplayEnum.DONE, value: IdeaStatusEnum.DONE },
]

const styles = {
  ideaTopBar: {
    margin: '100px 50px 0 50px',
    padding: '20px',
  },
  filtersGrid: {
    paddingTop: '20px',
  },
  formControl: {
    width: '100%',
  },
  hintText: {
    lineHeight: '24px',
  },
  searchInput: {
    marginTop: '16px',
    width: '80%',
  },
  stateSelect: {
    width: '80%',
  },
  stateSelectInput: {
    width: '100%',
  },
}

export default withStyles(styles)(connect(mapStateToProps)(IdeaTopBar))
