import urlcat from 'urlcat'

const request = async (url, { method = 'GET', params, body } = {}) => {
  // 完整的url
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
  const requestUrl = urlcat(apiUrl, url, params)

  // 请求头
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const config = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  }

  const res = await fetch(requestUrl, config)
  if (!res.ok) {
    const { message, errors } = await res.json().catch(() => null)
    const error = new Error(message)
    error.status = res.status
    error.errors = errors
    throw error
  }
  return await res.json()
}

export default request

export const get = (url, params) => request(url, { method: 'GET', params })
export const post = (url, body) => request(url, { method: 'POST', body })
export const put = (url, body) => request(url, { method: 'PUT', body })
export const del = (url) => request(url, { method: 'DELETE' })
