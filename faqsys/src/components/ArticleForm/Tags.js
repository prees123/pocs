import React from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import chroma from 'chroma-js'
import CreatableSelect from 'react-select/lib/Creatable'
import {getTags, createTag, setCreateTagSuccess} from '../../actions/Tag/TagActions.js'

class Tags extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      selectedTags: [],
      createdOptions: [],
      initialTags: props.initialTags,
      topLevelCategoryId: props.topLevelCategoryId,
    }
  }

  componentDidMount () {
    this.props.getTags(this.state.topLevelCategoryId)
    let tags = []
    if (this.state.initialTags) {
      for (let i = 0; i < this.state.initialTags.length; i++) {
        tags.push({id: this.state.initialTags[i].id, value: this.state.initialTags[i].name, label: this.state.initialTags[i].name, color: '#026549'})
      }
      this.setState({'selectedTags': tags})
    }
  }

  handleOnChange = (tags, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      this.props.createTag(tags[tags.length - 1].value, this.props.userInfo.fullName, this.props.topLevelCategoryId)
    } else {
      this.setState({'selectedTags': tags})
      this.props.tagCallback(tags)
    }
  }
  handleAddedTag = () => {
    let newTag = this.props.tags[this.props.tags.length - 1]
    let appendToSelectedTags = {id: newTag.id, value: newTag.name, label: newTag.name, color: '#026549'}
    this.setState({'selectedTags': [...this.state.selectedTags, appendToSelectedTags]})
    this.props.tagCallback([...this.state.selectedTags, this.props.tags[this.props.tags.length - 1]])
    this.props.setCreateTagSuccess(false)
  }

  render () {
    const { classes } = this.props
    if (this.props.isCreateTagSuccess) {
      this.handleAddedTag()
    }
    let tags = []
    let color
    tags.push(...this.props.tags)
    let tagOptions = []
    for (let i = 0; i < tags.length; i++) {
      tagOptions.push({id: tags[i].id, value: tags[i].name, label: tags[i].name, color: '#026549'})
    }
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
    return (<div className={classes.dropdown}>
      <CreatableSelect
        isClearable
        isMulti
        placeholder="Select or create tags..."
        onChange={this.handleOnChange}
        hideSelectedOptions
        value={this.state.selectedTags}
        options={tagOptions}
        styles={colourStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: 'black',
          },
        })}
      />
    </div>)
  }
}

Tags.defaultProps = {
  tags: [],
  selectedTags: [],
  createdOptions: [],
  initialTags: [],
  value: '',
  isCreateTagSuccess: false,
}

const styles = {
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
  }}

function mapStateToProps (state) {
  return {
    tags: state.tagReducer.tags,
    isCreateTagSuccess: state.tagReducer.isCreateTagSuccess,
    userInfo: state.user,
    topLevelCategoryId: state.category.topLevelCategoryId,
  }
}

const mapDispatchToProps = {
  getTags,
  createTag,
  setCreateTagSuccess}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Tags))
