import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getCategories, submitCategory} from '../../actions/Category/CategoryActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {Link} from 'react-router-dom'
import {setFileClicked, setQuillClicked, setTitleError, setCategoryError, setFormDescription, setFormTitle, setFormCategories, setFormTags, submitArticleForm, updateArticle, resetArticleFormAndArticle} from '../../actions/ArticleForm/ArticleFormActions'
import {setContentBlock, setContentBlocks} from '../../actions/ContentBlock/ContentBlockActions'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import CategoryMenu from './CategoryMenu'
import Tags from './Tags'
import Typography from '@material-ui/core/Typography'
import './styles.css'
import * as constants from '../../constants/constants'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import * as _ from 'lodash'
import apiConfig from '../../config/apiConfig'
import DeleteIcon from '@material-ui/icons/Delete'
import TextFields from '@material-ui/icons/TextFields'
import Chip from '@material-ui/core/Chip'
import {deleteFile, putFile} from '../../actions/Article/ArticleActions'
import PropTypes from 'prop-types'
class ArticleForm extends React.Component {
  constructor (props) {
    super(props)
    this.quill = React.createRef()
  }
  componentDidMount () {
    if (this.props.isEditing) {
      this.props.setContentBlocks(this.props.article.contentBlocks)
      this.props.setFormTitle(this.props.article.title)
      this.props.setFormCategories(this.props.article.categories)
      this.props.setFormTags(this.props.article.tags)
      this.props.setFormDescription(this.props.article.description)
    } else {
      this.props.resetArticleFormAndArticle()
    }
  }

  componentWillUnmount () {
    this.props.resetArticleFormAndArticle()
  }

  handleTagChoices = (formTags) => {
    this.props.setFormTags(formTags)
  }
  handleCategoryChoices = (formCategories) => {
    this.props.setFormCategories(formCategories)
  }

  handleChange = (event, index, tossLink) => {
    let media = {
      tossLink: tossLink,
      caption: event.target.value,
    }
    let contentBlocksCopy = [...this.props.contentBlocks]
    let block = {
      media: '',
      richText: '',
    }
    block.media = media
    block.richText = null
    this.props.setContentBlock(block)
    contentBlocksCopy[index] = block
    this.props.setContentBlocks(contentBlocksCopy)
  }

  handleInput = (event) => {
    this.props.setFormTitle(event.target.value)
  }

  handleBody = (value, index) => {
    let text = value
    let block = {
      media: '',
      richText: '',
    }
    let contentBlocksCopy = [...this.props.contentBlocks]
    block.media = null
    block.richText = text
    this.props.setContentBlock(block)
    contentBlocksCopy[index] = block
    this.props.setContentBlocks(contentBlocksCopy)
  }

  handleDeleteExisting = (filename, id) => {
    let contentBlocksCopy = [...this.props.contentBlocks]
    let mediaName = filename.split('||')
    let name = mediaName[mediaName.length - 1]
    let bucketName = this.props.tossBucket + '-' + apiConfig.environment
    this.props.deleteFile(bucketName, name)
    contentBlocksCopy.splice(id, 1)
    this.props.setContentBlocks(contentBlocksCopy)
  }

  handleRemoveQuill = (value, id) => {
    let contentBlocksCopy = [...this.props.contentBlocks]
    contentBlocksCopy.splice(id, 1)
    this.props.setContentBlocks(contentBlocksCopy)
  }
  renderButtonGroup = (isCurrentFormValid) => {
    let articleFormButtonsLink = `/`
    if (this.props.topLevelCategoryName) {
      articleFormButtonsLink = `/home/${this.props.topLevelCategoryName}`
    }
    if (isCurrentFormValid) {
      return (<div className="buttonGroup">
        <Link to="/">
          <Button id="cancel" component={Link} to={articleFormButtonsLink}>
            <Typography className="buttonLabel" color="error">
              Cancel
            </Typography>
          </Button>
        </Link>
        <Link to={articleFormButtonsLink}>
          <Button className="btnGroup" variant="raised" color="secondary" id="submit" onClick={(event) => { this.submit(constants.articleStatusValues.live) }}>
              Publish
          </Button>
        </Link>
        <Link to={articleFormButtonsLink}>
          <Button id="save" onClick={(event) => { this.submit(constants.articleStatusValues.draft) }}>
            <Typography className="buttonLabel" color="contrastText">
              Save As Draft
            </Typography>
          </Button>
        </Link>
      </div>)
    } else {
      return (<div className="buttonGroup">
        <Button id="cancel" component={Link} to={articleFormButtonsLink}>
          <Typography className="buttonLabel" color="error">
            Cancel
          </Typography>
        </Button>
        <Button className="btnGroup" variant="raised" color="secondary" id="submit" onClick={(event) => { this.submit(constants.articleStatusValues.live) }}>
            Publish
        </Button>
        <Button id="save" onClick={(event) => { this.submit(constants.articleStatusValues.draft) }}>
          <Typography className="buttonLabel" color="textSecondary">
            Save As Draft
          </Typography>
        </Button>
      </div>)
    }
  }

  isCurrentFormValid = () => {
    if (this.props.formTitle === '' || _.isEmpty(this.props.formCategories)) {
      return false
    }
    return true
  }

  validateOnSubmission = () => {
    let valid = true
    if (this.props.formTitle === '') {
      this.props.setTitleError('Title cannot be empty')
      valid = false
    } else {
      this.props.setTitleError('')
    }
    if (_.isEmpty(this.props.formCategories)) {
      this.props.setCategoryError('Category cannot be empty')
      valid = false
    } else {
      this.props.setCategoryError('')
    }
    return valid
  }

  submit = (status) => {
    let tagIds = []
    if (typeof this.props.formTags !== 'undefined') {
      for (let i = 0; i < this.props.formTags.length; i++) {
        tagIds.push(this.props.formTags[i].id)
      }
    }
    let categoryIds = []
    if (typeof this.props.formCategories !== 'undefined') {
      for (let i = 0; i < this.props.formCategories.length; i++) {
        categoryIds.push(this.props.formCategories[i].id)
      }
    }
    let formValues = {
      title: this.props.formTitle,
      contentBlocks: this.props.contentBlocks,
      createdBy: this.props.userInfo.fullName,
      updatedBy: '',
      categories: categoryIds,
      description: this.props.formDescription,
      status: status,
      tagIds: tagIds,
      topLevelCategoryId: this.props.topLevelCategoryId,
      topLevelCategoryName: this.props.topLevelCategoryName,
    }
    if (this.validateOnSubmission()) {
      if (this.props.isEditing) {
        formValues.updatedBy = this.props.userInfo.fullName
        this.props.updateArticle(formValues, this.props.article.id)
      } else {
        this.props.submitArticleForm(formValues)
      }
    }
  }

  chooseFile = (event) => {
    let med = {
      tossLink: '',
      caption: '',
    }
    this.props.setFileClicked(true)
    const inputFile = event.target.files[0]
    let timeStamp = Math.floor(Date.now() / 1000)
    const fileName = timeStamp + '||' + this.props.userInfo.lanId + '||' + inputFile.name.replace(/ /g, '_')
    const tossLink = 'https://toss.target.com/' + this.props.tossTenant + ':' + this.props.tossBucket + '-' + apiConfig.environment + '/' + fileName
    med.tossLink = tossLink
    let contentBlocksCopy = [...this.props.contentBlocks]
    let block = {
      media: '',
      richText: '',
    }
    block.media = med
    block.richText = null
    this.props.setContentBlock(block)
    contentBlocksCopy.push(block)
    this.props.setContentBlocks(contentBlocksCopy)
    let bucketName = this.props.tossBucket + '-' + apiConfig.environment
    this.props.putFile(bucketName, inputFile, fileName)
  }

  renderQuill = () => {
    this.props.setQuillClicked(true)
    let block = {
      media: '',
      richText: '',
    }
    let contentBlocksCopy = [...this.props.contentBlocks]
    block.media = null
    block.richText = ''
    this.props.setContentBlock(block)
    contentBlocksCopy.push(block)
    this.props.setContentBlocks(contentBlocksCopy)
  }
  handleDescription = (event) => {
    this.props.setFormDescription(event.target.value)
  }
  render () {
    let isCurrentFormValid = this.isCurrentFormValid()
    let contentButtons
    let quill
    contentButtons = (<div>
      <label htmlFor="contained-button-file">
        <input style={{display: 'none'}} id="contained-button-file" type="file" accept="image/*, video/*, .pdf, .doc/, .docx, .xlsx" onChange={this.chooseFile} />
        <Button variant="raised" color="primary" className="fileBtn" component="span">
          Add Media
          <AddAPhoto />
        </Button>
      </label>
      <Button variant="raised" color="primary" onClick={this.renderQuill}>
        Add Content
        <TextFields />
      </Button>
    </div>)
    quill = (Object.keys(this.props.contentBlocks).map((id, name) => {
      if (!this.props.contentBlocks[id].media) {
        return (<Paper>
          <Button className="delBtn" onClick={() => this.handleRemoveQuill(this.props.contentBlocks[id].richText, name)}>
            <DeleteIcon />
          </Button>
          <ReactQuill ref={this.quill} className="ql-container" value={this.props.contentBlocks[id].richText} onChange={(e) => this.handleBody(e, id)} />
        </Paper>)
      } else {
        let mediaName = this.props.contentBlocks[id].media.tossLink.split('||')
        return (<div className="media">
          <Paper elevation={1} className="paper">
            <Grid item><Chip className="chip" label={mediaName[mediaName.length - 1]} onDelete={() => this.handleDeleteExisting(this.props.contentBlocks[id].media.tossLink, name)} />
              <TextField className="captionField" id="filled-email-input" label="Caption" type="caption" name="caption" defaultValue={''} onChange={(e) => this.handleChange(e, id, this.props.contentBlocks[id].media.tossLink)} margin="normal" variant="filled" />
            </Grid>
          </Paper>
        </div>)
      }
    }))
    let pageTitle = this.props.isEditing ? 'Edit Article' : 'Add Article'
    return (<Grid container className="articleRoot">
      <Grid item xs={12}>
        <Grid container spacing={16} className="formContent">
          <Paper className="formPaper" elevation={22}>
            <Typography className="titleLabel" color="primary">
              {pageTitle}
            </Typography>
            <div className="descField">
              <TextField className="titleField" value={this.props.formTitle} inputProps={{maxLength: this.props.titleCharLimit}} label="Title*" type="text" helperText={`Character Count: ${this.props.formTitle.length}/${this.props.titleCharLimit}`} onKeyPress={this.handleTitleKeyPress} onChange={(e) => this.handleInput(e)} />
              <Typography className="errorText" color="error">{this.props.titleError}
              </Typography>
            </div>
            <div className="descField">
              <TextField className="titleField" value={this.props.formDescription} inputProps={{maxLength: this.props.descriptionCharLimit}} label="Description" type="text" helperText={`Character Count: ${this.props.formDescription.length}/${this.props.descriptionCharLimit}`} onChange={(e) => this.handleDescription(e)} />
            </div>
            <div className="formSection">
              <Typography className="sectionLabel" color="primary">
                Category*
              </Typography>
              <CategoryMenu initialCategories={this.props.article.categories} categoryCallback={this.handleCategoryChoices} />
              <Typography className="errorText" color="error">{this.props.categoryError}</Typography>
            </div>
            <div className="formSection">
              <Typography className="sectionLabel" color="primary">
                Tags
              </Typography>
              <Tags initialTags={this.props.article.tags} tagCallback={this.handleTagChoices} />
            </div>
            <div className="formSection">
              <Typography className="sectionLabel" color="primary">
                Content
              </Typography>
              {quill}
              {contentButtons}
            </div>
            {this.renderButtonGroup(isCurrentFormValid)}
          </Paper>
        </Grid>
      </Grid>
    </Grid>)
  }
}

function mapStateToProps (state) {
  return {
    userInfo: state.user,
    categories: state.category.categories,
    contentBlocks: state.contentBlockReducer.contentBlocks,
    contentBlock: state.contentBlockReducer.contentBlock,
    formTags: state.articleFormReducer.formTags,
    formCategories: state.articleFormReducer.formCategories,
    formTitle: state.articleFormReducer.formTitle,
    formDescription: state.articleFormReducer.formDescription,
    tossBucket: state.configurationReducer.tossBucket,
    tossTenant: state.configurationReducer.tossTenant,
    titleError: state.articleFormReducer.titleError,
    categoryError: state.articleFormReducer.categoryError,
    fileClicked: state.articleFormReducer.fileClicked,
    quillClicked: state.articleFormReducer.quillClicked,
    topLevelCategoryId: state.category.topLevelCategoryId,
    topLevelCategoryName: state.category.topLevelCategoryName,
  }
}

const mapDispatchToProps = {
  setFileClicked,
  setQuillClicked,
  setTitleError,
  setCategoryError,
  setFormDescription,
  setFormTitle,
  setFormCategories,
  setFormTags,
  deleteFile,
  putFile,
  setContentBlock,
  setContentBlocks,
  getCategories,
  submitCategory,
  submitArticleForm,
  updateArticle,
  resetArticleFormAndArticle,
}

ArticleForm.propTypes = {
  userInfo: PropTypes.object,
  categories: PropTypes.array,
  contentBlocks: PropTypes.array,
  contentBlock: PropTypes.object,
  formTags: PropTypes.array,
  formCategories: PropTypes.array,
  formTitle: PropTypes.string,
  formDescription: PropTypes.string,
  tossBucket: PropTypes.string,
  tossTenant: PropTypes.string,
  titleError: PropTypes.string,
  categoryError: PropTypes.string,
  fileClicked: PropTypes.bool,
  quillClicked: PropTypes.bool,
  titleCharLimit: PropTypes.number,
  categoryCharLimit: PropTypes.number,
  categoryName: PropTypes.string,
  isCategoryNew: PropTypes.bool,
  status: PropTypes.string,
  validForm: PropTypes.bool,
  showButtons: PropTypes.bool,
  isEditing: PropTypes.bool,
  topLevelCategoryId: PropTypes.number,
  topLevelCategoryName: PropTypes.string,
}
ArticleForm.defaultProps = {
  userInfo: '',
  categories: [],
  contentBlocks: [],
  contentBlock: {},
  formTags: [],
  formCategories: [],
  formTitle: '',
  formDescription: '',
  tossBucket: '',
  tossTenant: '',
  titleError: '',
  categoryError: '',
  fileClicked: false,
  quillClicked: false,
  isEditing: false,
  titleCharLimit: constants.charLimits.titleCharLimit,
  categoryCharLimit: constants.charLimits.categoryCharLimit,
  descriptionCharLimit: constants.charLimits.descriptionCharLimit,
  categoryName: '',
  isCategoryNew: false,
  status: constants.articleStatusValues.live,
  validForm: false,
  showButtons: false,
  topLevelCategoryId: null,
  topLevelCategoryName: '',
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleForm))
