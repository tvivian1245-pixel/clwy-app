import { ScrollView, StyleSheet } from 'react-native'
import useFetchData from '@/hooks/useFetchData'
import Loading from '@/components/shared/Loading'
import NetworkError from '@/components/shared/NetworkError'

export default function Index() {
  const url = '/'
  const { data, loading, error, onReload } = useFetchData(url)
  console.log(data, 'data')

  // 加载中
  if (loading) {
    return <Loading />
  }

  // 网络错误
  if (error) {
    return <NetworkError onReload={onReload} />
  }

  return <ScrollView style={styles.container}></ScrollView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
