import { useState } from 'react'
import { get } from '@/utils/request'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'

export default function useLoadMore(url, key, setData) {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  /**
   * 触底加载更多处理函数
   * - 防止重复请求
   * - 自动页码管理
   * - 自动判断是否有更多数据
   */
  const onEndReached = async () => {
    if (loading) return
    if (!hasMore) return

    setLoading(true)
    const nextPage = page + 1
    setPage(nextPage)

    try {
      // 请求接口
      const { data } = await get(url, { page: nextPage })
      if (data[key].length === 0) {
        setHasMore(false)
      } else {
        // 将新数据追加到现有列表中
        setData((prevData) => ({ [key]: [...prevData[key], ...data[key]] }))
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * 重置加载更多状态
   */
  const resetLoadMore = () => {
    setHasMore(true)
    setPage(1)
  }

  /**
   * 加载更多底部组件
   * 根据状态显示不同的提示信息：
   * - 加载中：显示指示器和加载中...
   * - 无更多数据：显示没有更多了
   * - 可加载：显示上拉加载更多
   */
  const LoadMoreFooter = () => {
    let message
    if (loading) {
      message = '加载中...'
    } else if (!hasMore) {
      message = '没有更多了'
    } else {
      message = '上拉加载更多'
    }

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="small" color="#1f99b0" />}
        <Text style={styles.message}>{message}</Text>
      </View>
    )
  }

  return {
    onEndReached,
    resetLoadMore,
    LoadMoreFooter,
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  message: {
    fontSize: 13,
    marginHorizontal: 16,
  },
})
