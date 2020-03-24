import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import {connect} from 'react-redux'
import {setClickedButton, setClicked, setComment, setCommentSubmitted, setUp, setDown} from '../../actions/Rating/RatingActions'
import {addComment} from '../../actions/Article/ArticleActions'
import {vote} from '../../actions/ArticleForm/ArticleFormActions'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
let uniqid = require('uniqid')

class Rating extends React.Component {
  constructor (props) {
    super(props)
    if (typeof this.props.article.thumbsUp !== 'undefined' && typeof this.props.article.thumbsDown !== 'undefined') {
      this.props.setUp(this.props.article.thumbsUp.length)
      this.props.setDown(this.props.article.thumbsDown.length)
    }
  }
  componentWillUnmount () {
    this.props.setCommentSubmitted(false)
    this.props.setComment('')
    this.props.setClicked(false)
    this.props.setClickedButton('none')
  }
  componentDidMount () {
    if (typeof this.props.article.thumbsUp !== 'undefined' && typeof this.props.article.thumbsDown !== 'undefined') {
      this.props.setUp(this.props.article.thumbsUp.length)
      this.props.setDown(this.props.article.thumbsDown.length)
    }
  }

  submitComment = () => {
    let emailValue = null
    if (typeof this.props.userInfo.email !== 'undefined') {
      emailValue = this.props.userInfo.email
    }
    const commentData = {
      email: emailValue,
      message: this.props.comment,
      articleId: this.props.article.id,
      articleName: this.props.article.title,
    }
    this.props.addComment(commentData)
    this.props.setCommentSubmitted(true)
  }
  handleChange = name => event => {
    this.props.setComment(event.target.value)
  }

  handleThumbsUp = (firstHit) => {
    let userId
    if (firstHit) {
      userId = uniqid()
    } else {
      userId = this.props.userInfo.lanId
    }
    let listDown = []
    let listUp = []

    if (this.props.article.thumbsDown) {
      for (let i = 0; i < this.props.article.thumbsDown.length; i++) {
        listDown.push(this.props.article.thumbsDown[i])
      }
    }
    if (this.props.article.thumbsUp) {
      for (let i = 0; i < this.props.article.thumbsUp.length; i++) {
        listUp.push(this.props.article.thumbsUp[i])
      }
    }
    listUp.push(userId)
    this.props.setUp(listUp.length)

    if (listDown.includes(userId)) {
      listDown.splice(listDown.indexOf(userId), 1)
      this.props.setDown(listDown.length)
    }

    let formValues = {
      thumbsUp: listUp,
      thumbsDown: listDown,
      categories: this.props.article.categories,
    }
    this.props.vote(formValues, this.props.article.id)
    this.props.setClickedButton('up')
    this.props.setClicked(true)
  }
  handleThumbsDown = (firstHit) => {
    let userId
    if (firstHit) {
      userId = uniqid()
    } else {
      userId = this.props.userInfo.lanId
    }
    let listDown = []
    let listUp = []

    if (this.props.article.thumbsDown) {
      for (let i = 0; i < this.props.article.thumbsDown.length; i++) {
        listDown.push(this.props.article.thumbsDown[i])
      }
    }
    if (this.props.article.thumbsUp) {
      for (let i = 0; i < this.props.article.thumbsUp.length; i++) {
        listUp.push(this.props.article.thumbsUp[i])
      }
    }
    listDown.push(userId)
    this.props.setDown(listDown.length)

    if (listUp.includes(userId)) {
      listUp.splice(listUp.indexOf(userId), 1)
      this.props.setUp(listUp.length)
    }

    let formValues = {
      thumbsUp: listUp,
      thumbsDown: listDown,
    }
    this.props.vote(formValues, this.props.article.id)
    this.props.setClickedButton('down')
    this.props.setClicked(true)
  }
  renderButtons = () => {
    let button
    if (typeof this.props.userInfo.lanId === 'undefined') {
      button = (<div>
        <IconButton color="primary" onClick={() => this.handleThumbsUp(true)}><ThumbUp />
          <Typography>{this.props.up}</Typography>
        </IconButton>
        <IconButton color="primary" onClick={() => this.handleThumbsDown(true)}><ThumbDown />
          <Typography>{this.props.down}</Typography>
        </IconButton>
        {this.renderComment()}
      </div>)
    } else {
      if ((typeof this.props.article.thumbsUp !== 'undefined' && typeof this.props.article.thumbsDown !== 'undefined')) {
        if (this.props.clickedButton === 'none' && !(this.props.article.thumbsUp.includes(this.props.userInfo.lanId)) && !(this.props.article.thumbsDown.includes(this.props.userInfo.lanId))) {
          button = (<div>
            <IconButton color="primary" onClick={() => this.handleThumbsUp(false)}><ThumbUp />
              <Typography>{this.props.up}</Typography>
            </IconButton>
            <IconButton color="primary" onClick={() => this.handleThumbsDown(false)}><ThumbDown />
              <Typography>{this.props.down}</Typography>
            </IconButton>
            {this.renderComment()}
          </div>)
        } else if (this.props.clickedButton === 'up' || (this.props.article.thumbsUp.includes(this.props.userInfo.lanId) && !(this.props.article.thumbsDown.includes(this.props.userInfo.lanId)))) {
          button = (<div>
            <IconButton color="primary" disabled="disabled" onClick={() => this.handleThumbsUp(false)}><ThumbUp />
              <Typography>{this.props.up}</Typography>
            </IconButton>
            <IconButton color="primary" onClick={() => this.handleThumbsDown(false)}><ThumbDown />
              <Typography>{this.props.down}</Typography>
            </IconButton>
            {this.renderComment()}
          </div>)
        } else if (this.props.clickedButton === 'down' || (this.props.article.thumbsDown.includes(this.props.userInfo.lanId) && !(this.props.article.thumbsUp.includes(this.props.userInfo.lanId)))) {
          button = (<div>
            <IconButton color="primary" onClick={() => this.handleThumbsUp(false)}><ThumbUp />
              <Typography>{this.props.up}</Typography>
            </IconButton>
            <IconButton disabled="disabled" onClick={() => this.handleThumbsDown(false)}><ThumbDown />
              <Typography>{this.props.down}</Typography>
            </IconButton>
            {this.renderComment()}
          </div>)
        }
      }
    }
    return button
  }

  renderComment = () => {
    const {classes} = this.props
    if (this.props.clicked) {
      if (this.props.commentSubmitted) {
        return (<div>
          <Typography className={classes.title} color="primary">Thank you for your feedback!</Typography>
        </div>)
      } else {
        return (<div>
          <Typography className={classes.title} color="primary">Comment:</Typography>
          <Card className={classes.paper}><TextField onChange={this.handleChange('name')} className={classes.textField} rows={1} rowsMax={3} inputProps={{
            maxLength: 100,
            className: classes.input,
          }} InputProps={{
            disableUnderline: true,
          }} type="text" />
          </Card>
          <Typography className={classes.helperText}>{`Character Count: ${this.props.comment.length}/${100}`}
          </Typography>
          <Button onClick={this.submitComment} variant="contained" className={classes.submitBtn}>Submit</Button>
        </div>)
      }
    }
  }
  render () {
    const {classes} = this.props
    let button = this.renderButtons()
    return (<div className={classes.ratingContainer}>
      <Typography className={classes.title} color="primary">
        Was this article helpful? {button}
      </Typography>
    </div>)
  }
}

function mapStateToProps (state) {
  return {
    article: state.articleReducer.article,
    up: state.ratingReducer.up,
    down: state.ratingReducer.down,
    commentSubmitted: state.ratingReducer.commentSubmitted,
    comment: state.ratingReducer.comment,
    clickedButton: state.ratingReducer.clickedButton,
    clicked: state.ratingReducer.clicked,
  }
}

const mapDispatchToProps = {
  setClickedButton,
  setClicked,
  setComment,
  setCommentSubmitted,
  setUp,
  setDown,
  addComment,
  vote}

const styles = {
  ratingContainer: {
    marginTop: '10%',
  },
  textField: {

    width: '365px',
    marginLeft: '10px',
    marginRight: '10px',
    paddingBottom: 0,
  },
  input: {
    color: 'black',
  },
  paper: {
    width: '400px',
  },
  submitBtn: {

    backgroundColor: '#026549',
    color: '#ffffff',
    fontSize: '14px',
    fontStyle: 'bold',
    marginLeft: '315px',
  },
  helperText: {
    color: 'gray',
    marginTop: '2px',
  },
  title: {
    fontSize: '18px',
  },
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Rating))
