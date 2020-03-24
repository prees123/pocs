import {combineReducers} from 'redux'
import category from './CategoryReducer'
import articleReducer from './ArticleReducer'
import layout from './LayoutReducer'
import notification from './NotificationReducer'
import auth from './AuthReducer'
import authModal from './AuthModalReducer'
import user from './UserReducer'
import error from './ErrorReducer'
import articleFormReducer from './ArticleFormReducer'
import searchReducer from './SearchReducer'
import tagReducer from './TagReducer'
import contentBlockReducer from './ContentBlockReducer'
import configurationReducer from './ConfigurationReducer'
import ratingReducer from './RatingReducer'
import ideaReducer from './IdeaReducer'

const rootReducer = combineReducers({
  category,
  layout,
  notification,
  articleReducer,
  auth,
  authModal,
  user,
  error,
  articleFormReducer,
  searchReducer,
  tagReducer,
  contentBlockReducer,
  configurationReducer,
  ratingReducer,
  ideaReducer,
})
export default rootReducer
