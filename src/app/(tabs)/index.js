import { ScrollView, StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import useFetchData from '@/hooks/useFetchData'
import Loading from '@/components/shared/Loading'
import NetworkError from '@/components/shared/NetworkError'

export default function Index() {
  const url = '/'
  const { data, loading, error, onReload } = useFetchData(url)
  const { recommendedCourses, likesCourses, introductoryCourses } = data

  // 加载中
  if (loading) {
    return <Loading />
  }

  // 网络错误
  if (error) {
    return <NetworkError onReload={onReload} />
  }

  /**
   * 渲染列表中的每个课程
   * @param item
   * @param index
   */
  const renderItem = ({ item, index }) => (
    <Link asChild href={{ pathname: '/courses/[id]', params: { id: 1 } }}>
      <Pressable>
        <View
          style={[
            styles.course,
            index === 0 && styles.first,
            index === recommendedCourses.length - 1 && styles.last,
          ]}
        >
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.category}>{item.category.name}</Text>
            <View style={styles.userWrapper}>
              <Image
                source={{
                  uri: item.user.avatar,
                }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.nickname}>{item.user.nickname}</Text>
                <Text style={styles.company} numberOfLines={2}>
                  {item.user.company}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  )

  return (
    <ScrollView style={styles.container}>
      {/* 推荐的课程 */}
      <View style={styles.slides}>
        <FlatList
          data={recommendedCourses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slides: {
    marginTop: 10,
    marginBottom: 16,
  },
  course: {
    marginRight: 8,
  },
  image: {
    width: 320,
    height: 145,
    borderRadius: 10,
  },
  content: {
    paddingLeft: 10,
  },
  name: {
    width: 305,
    marginTop: 7,
    fontWeight: 'bold',
    fontSize: 13,
  },
  category: {
    marginTop: 6,
    fontSize: 8,
  },
  userWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  nickname: {
    fontSize: 11,
  },
  company: {
    width: 100,
    marginTop: 2,
    fontSize: 10,
    color: '#777',
  },
  first: {
    marginLeft: 10,
  },
  last: {
    marginRight: 10,
  },
})
