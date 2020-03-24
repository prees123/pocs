import React, {Component} from 'react'
import {getCategories, setCategoryId, setCategoryName, setMenuAndSearchFunctionalityDisabled, getCategoryByName, getChildrenCategoriesById} from '../../actions/Category/CategoryActions'
import {connect} from 'react-redux'
import CategoryTile from '../../components/CategoryTile/CategoryTile'
import * as _ from 'lodash'
import { withRouter } from 'react-router'
class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: props.categories,
      categoryId: '',
      topLevelCategoryName: '',
    }
  }

  HandleOnClick = (id, name, e) => {
    this.props.setCategoryId(id)
    this.props.setCategoryName(name)
  }

  componentDidMount () {
    if (!this.props.categoryName) {
      let topLevelCategoryName = _.last(_.split(this.props.location.pathname, '/'))
      this.props.getCategoryByName(topLevelCategoryName)
    } else {
      this.props.getChildrenCategoriesById(this.props.topLevelCategoryId)
    }
    this.props.setMenuAndSearchFunctionalityDisabled(false)
  }

  render () {
    return (<div>
      <CategoryTile categories={this.props.categories} categoryName={this.props.categoryName} categoryId={this.props.categoryId} topLevelCategoryId={this.props.topLevelCategoryId} topLevelCategoryName={this.props.topLevelCategoryName} onButtonClick={this.HandleOnClick} />
    </div>)
  }
}

Categories.defaultProps = {
  classes: {},
  categories: [],
  categoryId: '',
  categoryName: '',
}

const mapDispatchToProps = {
  getCategories,
  setCategoryId,
  setCategoryName,
  setMenuAndSearchFunctionalityDisabled,
  getChildrenCategoriesById,
  getCategoryByName,
}

function mapStateToProps (state) {
  return {topLevelCategoryName: state.category.topLevelCategoryName, topLevelCategoryId: state.category.topLevelCategoryId, categories: state.category.categories, categoryId: state.category.categoryId, categoryName: state.category.categoryName, isGetCategoriesPending: state.category.isGetCategoriesPending, isGetCategoriesError: state.category.isGetCategoriesError}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))
