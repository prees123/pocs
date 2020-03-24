import React from 'react'
import {connect} from 'react-redux'
import {submitCategory, setCreateCategorySuccess, getCategories, getChildrenCategoriesById} from '../../actions/Category/CategoryActions'
import CreatableSelect from 'react-select/lib/Creatable'
import * as _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import chroma from 'chroma-js'

class CategoryMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: [],
      selectedCategories: [],
      createdOptions: [],
      initialCategories: props.initialCategories,
      topLevelCategoryId: props.topLevelCategoryId,
    }
  }

  componentDidMount () {
    this.props.getChildrenCategoriesById(this.state.topLevelCategoryId)
    let categories = []
    if (this.state.initialCategories) {
      for (let i = 0; i < this.state.initialCategories.length; i++) {
        categories.push({id: this.state.initialCategories[i].id, value: this.state.initialCategories[i].name, label: this.state.initialCategories[i].name, color: '#026549'})
      }
      this.setState({'selectedCategories': categories})
    }
  }

handleOnChange = (categories, actionMeta) => {
  let form
  if (!_.isEmpty(categories)) {
    form = {
      name: categories[categories.length - 1].value,
      createdBy: (this.props.userInfo.firstName + ' ' + this.props.userInfo.lastName),
      parentCategoryId: this.props.topLevelCategoryId,
    }
  }
  if (actionMeta.action === 'create-option') {
    this.props.submitCategory(form)
  } else {
    this.setState({'selectedCategories': categories})
    this.props.categoryCallback(categories)
  }
}
handleAddedCategory = () => {
  let newCategory = this.props.categories[this.props.categories.length - 1]
  let appendToSelectedCategories = {id: newCategory.id, value: newCategory.name, label: newCategory.name, color: '#026549'}
  this.setState({'selectedCategories': [...this.state.selectedCategories, appendToSelectedCategories]})
  this.props.categoryCallback([...this.state.selectedCategories, this.props.categories[this.props.categories.length - 1]])
  this.props.setCreateCategorySuccess(false)
}

render () {
  const {classes} = this.props
  if (this.props.isCreateCategorySuccess) {
    this.handleAddedCategory()
  }
  let categories = []
  categories.push(...this.props.categories)
  let options = []
  for (let i = 0; i < categories.length; i++) {
    options.push({id: categories[i].id, value: categories[i].name, label: categories[i].name, color: '#026549'})
  }
  let color
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      if (data.color) {
        color = chroma(data.color)
      } else {
        color = chroma('#026549')
        data.color = ('#026549')
      }
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected ? 'white' : isFocused ? color.alpha(0.1).css() : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? chroma.contrast(color, data.color) > 2 ? 'white' : data.color
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
      }
    },
    multiValue: (styles, { data }) => {
      let color
      if (data.color) {
        color = chroma(data.color)
      } else {
        color = chroma('#026549')
      }
      return {
        ...styles,
        margin: '5px',
        backgroundColor: color.alpha(0.1).css(),
      }
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  }

  return (
    <div className={classes.dropdown}>
      <CreatableSelect
        isClearable
        isMulti
        placeholder="Select or create categories..."
        hideSelectedOptions
        onChange={this.handleOnChange}
        value={this.state.selectedCategories}
        options={options}
        styles={colourStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: 'black',
          },
        })} />
    </div>)
}
}

CategoryMenu.defaultProps = {
  categories: [],
  isCreateCategorySuccess: false,
  selectedCategories: [],
  initialCategories: [],
  createdOptions: [],
}

function mapStateToProps (state) {
  return {
    userInfo: state.user,
    categories: state.category.categories,
    isCreateCategorySuccess: state.category.isCreateCategorySuccess,
    topLevelCategoryId: state.category.topLevelCategoryId,
  }
}

const mapDispatchToProps = {
  submitCategory,
  setCreateCategorySuccess,
  getCategories,
  getChildrenCategoriesById,
}

const styles = {
  test: {
    color: 'green',
  },
  dropdown: {
    width: '25%',
    boxShadow: '0px 1px 1px gray',
  },

  select: {
    backgroundcolor: 'blue',
  },
  downIcon: {
    transition: 'transform 0.3s',
  },

  downIconOpen: {
    transform: 'rotate(180deg)',
  },
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CategoryMenu))
