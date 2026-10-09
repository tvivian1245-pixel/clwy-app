import { get } from '@/utils/request'
import { useReducer, useEffect } from 'react'

const initialState = {
  data: {},
  loading: true,
  error: false,
}

// action
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_ERROR = 'FETCH_ERROR'
const SET_DATA = 'SET_DATA'
const RELOAD_START = 'RELOAD_START'

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: false }
    case FETCH_ERROR:
      return { ...state, error: true, loading: false }
    case SET_DATA:
      return { ...state, data: action.payload }
    case RELOAD_START:
      return { ...state, loading: true, error: false }
    default:
      return state
  }
}

// 使用
const useFetchData = (url, params) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { data } = await get(url, params)
      dispatch({ type: FETCH_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_ERROR })
    }
  }

  const onReload = async () => {
    dispatch({ type: RELOAD_START })
    await fetchData()
  }

  const setData = (data) => {
    dispatch({ type: SET_DATA, payload: data })
  }

  useEffect(() => {
    fetchData()
  }, [url, JSON.stringify(params)])

  return { ...state, onReload, setData }
}

export default useFetchData
