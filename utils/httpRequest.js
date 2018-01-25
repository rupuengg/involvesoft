import moment from 'moment'

let restBaseURL = window.location.origin
let authenticationUrl = window.location.origin

export const getRestBaseURL = () => {
  return restBaseURL
}

export const setRestBaseURL = (baseURL) => {
  restBaseURL = baseURL
}

export const getAuthenticationURL = () => {
  return authenticationUrl
}

export const setAuthenticationURL = (baseURL) => {
  authenticationUrl = baseURL
}

function serialize (params = {}) {
  const URIencode = (k, v) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`

  return Object.keys(params).map(
      (k) => {
        let temp = params[k]
        // convert array to array notation.
        if (temp.constructor === Array && temp.length) {
          return encodeURIComponent(k) + '=' + temp.map((i) => encodeURIComponent(i)).join(',') + ''
        } else if (temp.constructor === Date) {
          // convert date to iso format
          temp = moment(temp).format('YYYY-MM-DDTHH:mm:ss.SSS')
        }

        return URIencode(k, temp)
      }
  ).join('&')
}

function checkResponseStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return response.json().then(Promise.reject.bind(Promise))
  }
}

// UPDATE for including query parameters for all http verbs
export function request (method, url, params, headers, formData, queryString) {
  const options = {
    method: method,
    headers: Object.assign({},{
      //'content-type': 'multipart/form-data'
      'Content-Type':'application/x-www-form-urlencoded'
    }, headers),
    credentails:'include'

  }


  const paramsRequests = ['delete', 'update', 'post', 'put']

  if (url.indexOf('http') !== 0) {
    url = getRestBaseURL() + url
  }

  if (paramsRequests.includes(method.toLowerCase())) {
    if (queryString) {
      url = `${url}?${serialize(params)}`
    } else {
      options.body = (typeof params === 'object') && formData ? serialize(params) : JSON.stringify(params)
    }
  } else if (params) {
    url = `${url}?${serialize(params)}`
  }

  return fetch(url, options)
    .then(checkResponseStatus)
}

export const encodeParams = (params) => serialize(params)

export const del = (url, params, headers, formData, queryString) => request('delete', url, params, headers, formData, queryString)

export const put = (url, params, headers, formData, queryString) => request('put', url, params, headers, formData, queryString)

export const post = (url, params, headers, formData, queryString) => request('post', url, params, headers, formData, queryString)
 
export const get = (url, params, headers, formData, queryString) => request('get', url, params, headers, formData, queryString)
