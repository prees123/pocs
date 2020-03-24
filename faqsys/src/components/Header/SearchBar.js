import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import {withRouter} from 'react-router-dom'
import Input from '@material-ui/core/Input'
import {executeSearchQuery, setShouldExecuteSearchQuery, setSearchQuery} from '../../actions/Search/SearchActions'
import {setMenuAndSearchFunctionalityDisabled, getCategoryByName} from '../../actions/Category/CategoryActions'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import * as userInfoService from '../../services/userInfo'

class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchQuery: '',
    }
  }

  componentDidMount () {
    this.props.setShouldExecuteSearchQuery(false)
    this.props.setSearchQuery('')
  }

  handleInput = (inputField) => event => {
    if (event.target) {
      this.setState({
        searchQuery: event.target.value,
      })
    }
  }
  checkForEnterPress = () => event => {
    if (event.key === 'Enter' && this.state.searchQuery) {
      this.props.setShouldExecuteSearchQuery(true)
      this.props.setSearchQuery(this.state.searchQuery)
      const hasWriteAccess = userInfoService.isMemberOf(this.props.user.memberOf, this.props.adGroup)
      this.props.executeSearchQuery(hasWriteAccess, this.state.searchQuery, this.props.topLevelCategoryId)
      this.setState({
        searchQuery: '',
      })
    }
  }

  render () {
    const {classes} = this.props
    if (!this.props.isMenuAndSearchFunctionalityDisabled) {
      if (this.props.shouldExecuteSearchQuery) {
        this.props.setShouldExecuteSearchQuery(false)
        this.props.history.push('/search/' + this.props.topLevelCategoryName + '?searchQuery=' + this.props.searchQuery)
      }
      return (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Input
            className={classes.inputInput} disableUnderline
            placeholder="Search for articles..."
            value={this.state.searchQuery}
            onChange={this.handleInput('searchQuery')}
            onKeyPress={this.checkForEnterPress()} />
        </div>
      )
    } else {
      return (<div />)
    }
  }
}

SearchBar.defaultProps = {
  searchQuery: '',
  shouldExecuteSearchQuery: false,
  topLevelCategoryName: '',
}
const mapDispatchToProps = {
  executeSearchQuery,
  setMenuAndSearchFunctionalityDisabled,
  getCategoryByName,
  setShouldExecuteSearchQuery,
  setSearchQuery,
}

function mapStateToProps (state) {
  return {
    searchResults: state.searchReducer.searchResults,
    searchQuery: state.searchReducer.searchQuery,
    user: state.user,
    adGroup: state.configurationReducer.adGroup,
    isMenuAndSearchFunctionalityDisabled: state.category.isMenuAndSearchFunctionalityDisabled,
    topLevelCategoryName: state.category.topLevelCategoryName,
    topLevelCategoryId: state.category.topLevelCategoryId,
    shouldExecuteSearchQuery: state.searchReducer.shouldExecuteSearchQuery,
  }
}

const styles = {
  search: {
    position: 'relative',
    backgroundColor: 'white',
    width: '300px',
    height: '30px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    display: 'flex',
    flexDirection: '2',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  inputInput: {
    width: '100%',
    paddingRight: '50px',
  },

}
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar)))
