const appName = process.env.VUE_APP_NAME || 'chaste'

export default {

  appName: appName,

  cookieExpires: 7,

  tokenKey: appName + ':token',

  version: process.env.VUE_APP_VERSION || '0.0.1',

  apiBaseUrl: process.env.VUE_APP_API_BASE_URL,

  uploadAction: process.env.VUE_APP_API_BASE_URL + '/upload'

}
