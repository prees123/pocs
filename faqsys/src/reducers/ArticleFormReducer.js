import update from 'immutability-helper'
import * as constants from '../constants/constants'
import {
  SET_ARTICLE_FORM_SUBMISSION_FAILURE,
  SET_ARTICLE_FORM_SUBMISSION_PENDING,
  SET_ARTICLE_FORM_SUBMISSION_SUCCESS,
  SET_CATEGORY_CREATION_PENDING,
  SET_CATEGORY_CREATION_SUCCESS,
  SET_CATEGORY_CREATION_FAILURE,
  SET_FORM_TAGS,
  SET_FORM_CATEGORIES,
  SET_FORM_TITLE,
  SET_FORM_DESCRIPTION,
  SET_TITLE_ERROR,
  SET_CATEGORY_ERROR,
  SET_FILE_CLICKED,
  SET_QUILL_CLICKED,
} from '../actions/actionTypes'
const initialState = {
  isArticleSubmissionPending: false,
  isArticleSubmissionFailure: false,
  isArticleSubmissionSuccess: false,
  isCategoryCreationPending: false,
  isCategoryCreationFailure: false,
  isCategoryCreationSuccess: false,
  quillClicked: false,
  fileClicked: false,
  formTags: [],
  formCategories: [],
  formTitle: '',
  formDescription: '',
  titleError: '',
  categoryError: '',
  titleCharLimit: constants.charLimits.titleCharLimit,
  categoryCharLimit: constants.charLimits.categoryCharLimit,
  descriptionCharLimit: constants.charLimits.descriptionCharLimit,
  status: constants.articleStatusValues.live,
}
export default function ArticleFormReducer (state = initialState, {
  type,
  isArticleSubmissionPending,
  isArticleSubmissionFailure,
  isArticleSubmissionSuccess,
  isCategoryCreationPending,
  isCategoryCreationFailure,
  isCategoryCreationSuccess,
  formTags,
  formCategories,
  formTitle,
  formDescription,
  titleError,
  categoryError,
  fileClicked,
  quillClicked,
}) {
  let result
  switch (type) {
    case SET_ARTICLE_FORM_SUBMISSION_PENDING:
    {
      result = update(state, {
        isArticleSubmissionPending: {
          $set: isArticleSubmissionPending,
        },
      })
      break
    }

    case SET_ARTICLE_FORM_SUBMISSION_SUCCESS:
    {
      result = update(state, {
        isArticleSubmissionSuccess: {
          $set: isArticleSubmissionSuccess,
        },
      })
      break
    }

    case SET_ARTICLE_FORM_SUBMISSION_FAILURE:
    {
      result = update(state, {
        isArticleSubmissionFailure: {
          $set: isArticleSubmissionFailure,
        },
      })
      break
    }

    case SET_CATEGORY_CREATION_PENDING:
    {
      result = update(state, {
        isCategoryCreationPending: {
          $set: isCategoryCreationPending,
        },
      })
      break
    }

    case SET_CATEGORY_CREATION_SUCCESS:
    {
      result = update(state, {
        isCategoryCreationSuccess: {
          $set: isCategoryCreationSuccess,
        },
      })
      break
    }

    case SET_CATEGORY_CREATION_FAILURE:
    {
      result = update(state, {
        isCategoryCreationFailure: {
          $set: isCategoryCreationFailure,
        },
      })
      break
    }

    case SET_FORM_TAGS:
    {
      result = update(state, {
        formTags: {
          $set: formTags,
        },
      })
      break
    }
    case SET_FORM_CATEGORIES:
    {
      result = update(state, {
        formCategories: {
          $set: formCategories,
        },
      })
      break
    }
    case SET_FORM_TITLE:
    {
      result = update(state, {
        formTitle: {
          $set: formTitle,
        },
      })
      break
    }
    case SET_FORM_DESCRIPTION:
    {
      result = update(state, {
        formDescription: {
          $set: formDescription,
        },
      })
      break
    }
    case SET_TITLE_ERROR:
    {
      result = update(state, {
        titleError: {
          $set: titleError,
        },
      })
      break
    }
    case SET_CATEGORY_ERROR:
    {
      result = update(state, {
        categoryError: {
          $set: categoryError,
        },
      })
      break
    }
    case SET_FILE_CLICKED:
    {
      result = update(state, {
        fileClicked: {
          $set: fileClicked,
        },
      })
      break
    }
    case SET_QUILL_CLICKED:
    {
      result = update(state, {
        quillClicked: {
          $set: quillClicked,
        },
      })
      break
    }
    default:
      return state
  }
  return result
}
