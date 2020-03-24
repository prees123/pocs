import {
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_BACKGROUND_COLOR,
  SET_BACKGROUND_IMAGE,
  SET_LOGO_IMAGE,
  SET_PRODUCT_DESCRIPTION,
  SET_PRODUCT_IMAGE,
  SET_APP_NAME,
  SET_AD_GROUP,
  SET_TOSS_BUCKET,
  SET_TOSS_TENANT,
} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  primaryColor: '#026549',
  secondaryColor: '#a0cd4f',
  backgroundColor: '#ffffff',
  backgroundImage: 'https://toss.target.com/Merch:trellis/trellisBackground.jpeg',
  logoImage: 'https://toss.target.com/Merch:trellis/logo.svg',
  productDescription: 'Welcome to Trellis, your home for help with',
  productImage: 'https://toss.target.com/Merch:trellis/ivy-promo-transparent.svg',
  appName: 'Trellis',
  adGroup: 'APP-OAUTH2-Trellis-PGDev-NPE',
  tossBucket: 'trellis',
  tossTenant: 'Merch',
}

export default function ConfigurationReducer (state = initialState, {type, primaryColor, secondaryColor, backgroundColor, backgroundImage, logoImage, productDescription, productImage, appName, adGroup, tossBucket, tossTenant}) {
  let result
  switch (type) {
    case SET_PRIMARY_COLOR:
    {
      result = update(state, {
        primaryColor: {
          $set: primaryColor,
        },
      })
      break
    }
    case SET_SECONDARY_COLOR:
    {
      result = update(state, {
        secondaryColor: {
          $set: secondaryColor,
        },
      })
      break
    }
    case SET_BACKGROUND_COLOR:
    {
      result = update(state, {
        backgroundColor: {
          $set: backgroundColor,
        },
      })
      break
    }
    case SET_BACKGROUND_IMAGE:
    {
      result = update(state, {
        backgroundImage: {
          $set: backgroundImage,
        },
      })
      break
    }
    case SET_LOGO_IMAGE:
    {
      result = update(state, {
        logoImage: {
          $set: logoImage,
        },
      })
      break
    }
    case SET_PRODUCT_DESCRIPTION:
    {
      result = update(state, {
        productDescription: {
          $set: productDescription,
        },
      })
      break
    }
    case SET_PRODUCT_IMAGE:
    {
      result = update(state, {
        productImage: {
          $set: productImage,
        },
      })
      break
    }
    case SET_APP_NAME:
    {
      result = update(state, {
        appName: {
          $set: appName,
        },
      })
      break
    }
    case SET_AD_GROUP:
    {
      result = update(state, {
        adGroup: {
          $set: adGroup,
        },
      })
      break
    }
    case SET_TOSS_BUCKET:
    {
      result = update(state, {
        tossBucket: {
          $set: tossBucket,
        },
      })
      break
    }
    case SET_TOSS_TENANT:
    {
      result = update(state, {
        tossTenant: {
          $set: tossTenant,
        },
      })
      break
    }
    default:
      return state
  }
  return result
}
