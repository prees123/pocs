import axios from 'axios'

export function formatHttpError (error) {
  return {
    type: 'http',
    level: 'error',
    message: error.response.data,
    code: error.response.status,
  }
}

export default function configureHttpInterceptor (headerProgress, setErrorMessage, showNotification, showAuthModal, accessToken) {
  const globalLoading = headerProgress
  const handleError = setErrorMessage
  const bearerToken = accessToken

  // We intercept http requests here
  // This is a nice way to modify the outgoing request before it is sent
  // We show global loading progress here
  // We attach bearer tokens to the Authorization header

  axios.interceptors.request.use((config) => {
    // Do something before request is sent
    if (bearerToken) {
      config.headers.Authorization = bearerToken
    } else {
      delete config.headers.Authorization
    }
    globalLoading(true)
    return config
  }, (error) => {
    // Do something with request error
    globalLoading(false)
    return Promise.reject(error)
  })

  axios.interceptors.response.use((response) => {
    // We intercept http responses here
    // This is a nice way to inspect the response and take action based on some criteria
    globalLoading(false)
    return response
  }, (error = {}) => {
    globalLoading(false)
    if (error.response) {
      // Do something with response error
      let code = error.response.status
      if (code === 401) {
        showAuthModal(true)
      } else if (code === 403) {
        showNotification(true, 'You’re not authorized to do that.')
      } else if (code >= 500) {
        handleError(formatHttpError(error))
        showNotification(true, error.message)
      }
    }
    return Promise.reject(error)
  })
}
