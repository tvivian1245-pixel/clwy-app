import { get } from '@/utils/request'
import { useState, useEffect } from 'react'

const useFetchData = (url, params) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { data } = await get(url, params)
      setData(data)
    } catch (error) {
      setErrorMsg('接口连不上了')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url, JSON.stringify(params)])

  const onReload = () => {
    setLoading(true)
    setErrorMsg(null)
    fetchData()
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  return { data, setData, loading, errorMsg, refreshing, onReload, onRefresh }
}

export default useFetchData
