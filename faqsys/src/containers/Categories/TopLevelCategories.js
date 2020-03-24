import React, {Component} from 'react'
import {getCategories, setCategoryId, setCategoryName, getTopLevelCategories, setMenuAndSearchFunctionalityDisabled, setTopLevelCategoryId, setTopLevelCategoryName} from '../../actions/Category/CategoryActions'
import {connect} from 'react-redux'
import TopLevelCategoryTiles from '../../components/CategoryTile/TopLevelCategoryTiles'
import { withRouter } from 'react-router'

class TopLevelCategories extends Component {
  HandleOnClick = (id, name, e) => {
    this.props.setCategoryId(id)
    this.props.setCategoryName(name)
    this.props.setTopLevelCategoryId(id)
    this.props.setTopLevelCategoryName(name)
  }

  componentDidMount () {
    this.props.getTopLevelCategories()
    this.props.setMenuAndSearchFunctionalityDisabled(true)
  }

  componentWillUnmount () {
    this.props.setMenuAndSearchFunctionalityDisabled(false)
  }

  render () {
    return (<div>
      <TopLevelCategoryTiles categories={this.props.categories} categoryName={this.props.categoryName} categoryId={this.props.categoryId} onButtonClick={this.HandleOnClick} />
    </div>)
  }
}

TopLevelCategories.defaultProps = {
  classes: {},
  categories: [],
  categoryId: '',
  categoryName: '',
}

const mapDispatchToProps = {
  getCategories,
  setCategoryId,
  setCategoryName,
  getTopLevelCategories,
  setMenuAndSearchFunctionalityDisabled,
  setTopLevelCategoryId,
  setTopLevelCategoryName,
}

function mapStateToProps (state) {
  return {categories: state.category.categories, categoryId: state.category.categoryId, categoryName: state.category.categoryName, isGetCategoriesPending: state.category.isGetCategoriesPending, isGetCategoriesError: state.category.isGetCategoriesError}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopLevelCategories))
