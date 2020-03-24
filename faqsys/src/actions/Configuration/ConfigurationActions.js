import {
  SET_AD_GROUP,
  SET_APP_NAME,
  SET_BACKGROUND_COLOR,
  SET_BACKGROUND_IMAGE,
  SET_LOGO_IMAGE,
  SET_PRIMARY_COLOR,
  SET_PRODUCT_DESCRIPTION,
  SET_PRODUCT_IMAGE,
  SET_SECONDARY_COLOR,
  SET_TOSS_BUCKET,
  SET_TOSS_TENANT,
} from '../actionTypes'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'
import * as notificationActions from '../Notification/NotificationActions'

export function setPrimaryColor (primaryColor) {
  return {type: SET_PRIMARY_COLOR, primaryColor}
}

export function setSecondaryColor (secondaryColor) {
  return {type: SET_SECONDARY_COLOR, secondaryColor}
}

export function setBackgroundColor (backgroundColor) {
  return {type: SET_BACKGROUND_COLOR, backgroundColor}
}

export function setBackgroundImage (backgroundImage) {
  return {type: SET_BACKGROUND_IMAGE, backgroundImage}
}

export function setLogoImage (logoImage) {
  return {type: SET_LOGO_IMAGE, logoImage}
}

export function setProductDescription (productDescription) {
  return {type: SET_PRODUCT_DESCRIPTION, productDescription}
}

export function setProductImage (productImage) {
  return {type: SET_PRODUCT_IMAGE, productImage}
}

export function setAppName (appName) {
  return {type: SET_APP_NAME, appName}
}

export function setAdGroup (adGroup) {
  return {type: SET_AD_GROUP, adGroup}
}

export function setTossBucket (tossBucket) {
  return {type: SET_TOSS_BUCKET, tossBucket}
}

export function setTossTenant (tossTenant) {
  return {type: SET_TOSS_TENANT, tossTenant}
}

export function updateConfiguration (form) {
  return dispatch => {
    axios.put(apiConfig.updateConfiguration.replace(':id', '1'), form).then(({data: configuration}) => {
      dispatch(setConfiguration(configuration))
    }).catch(() => {
      dispatch(notificationActions.showNotification(true, 'Configuration category update failed. Resubmit your changes'))
    })
  }
}

export function getColor () {
  return dispatch => {
    return axios.get(apiConfig.getConfiguration).then(({data}) => {
      dispatch(setConfiguration(data[0]))
    }).catch(() => {
      dispatch(notificationActions.showNotification(true, 'Failed to get Configuration'))
    })
  }
}

export function setConfiguration (config) {
  return dispatch => {
    dispatch(setPrimaryColor(config.primaryColor))
    dispatch(setSecondaryColor(config.secondaryColor))
    dispatch(setBackgroundColor(config.backgroundColor))
    dispatch(setBackgroundImage(config.backgroundImage))
    dispatch(setLogoImage(config.logoImage))
    dispatch(setProductImage(config.productImage))
    dispatch(setAppName(config.appName))
    dispatch(setAdGroup(config.adGroup))
    dispatch(setTossBucket(config.tossBucket))
  }
}
