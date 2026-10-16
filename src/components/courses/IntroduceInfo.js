import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Share,
  Platform,
} from 'react-native'
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons'
import { Image } from 'expo-image'

export default function IntroduceInfo(props) {
  const { course } = props

  const onShare = async () => {
    const url = 'https://clwy.cn/courses/fullstack-node'
    // 线上环境
    // const url = `${process.env.EXPO_PUBLIC_API_URL}/courses/${course.id}`
    const message = Platform.OS === 'ios' ? course.name : `${course.name}：\n${url}`

    await Share.share({
      message,
      url,
    })
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: course.image }}
        resizeMode="cover"
        style={styles.bgImage}
        blurRadius={20}
      >
        {/* 半透明背景 */}
        <View style={styles.whiteBg}></View>

        <Image source={{ uri: course.image }} style={styles.image} />
        <Text style={styles.name} numberOfLines={2}>
          {course.name}
        </Text>
        <View style={styles.others}>
          <View style={styles.info}>
            <View style={styles.countWrapper}>
              <Text style={styles.count}>全{course.chaptersCount}回</Text>
            </View>
            <Text style={styles.createdAt}>{course.createdAt}发布</Text>
          </View>
          <View style={styles.buttons}>
            <View style={styles.shareWrapper}>
              {/* Pressable 写法 */}
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.2 : 1.0 }, // 按压时透明度降至 0.2
                ]}
                onPress={onShare}
              >
                <MaterialDesignIcons name={'share'} size={26} color={'#000'} />
              </Pressable>
              <Text style={styles.shareText}>分享</Text>
            </View>
            <View style={styles.likeWrapper}>
              {/* TouchableOpacity 写法 */}
              <TouchableOpacity>
                <MaterialDesignIcons name={'heart-outline'} size={28} color={'#ff7f6f'} />
              </TouchableOpacity>
              <Text style={styles.likeText}>{course.likesCount}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  bgImage: {
    height: 303,
    position: 'relative',
  },
  whiteBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 303,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  image: {
    height: 170,
  },
  name: {
    marginTop: 22,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '500',
    height: 52,
  },
  others: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  info: {
    backgroundColor: 'transparent',
  },
  countWrapper: {
    width: 60,
    height: 18,
    backgroundColor: '#1f99b0',
    borderRadius: 5,
  },
  count: {
    lineHeight: 18,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '300',
    color: '#fff',
    zIndex: 1,
  },
  createdAt: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '300',
    color: '#777',
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  shareWrapper: {
    marginRight: 25,
    backgroundColor: 'transparent',
  },
  shareText: {
    marginTop: 3,
    fontSize: 10,
    textAlign: 'center',
  },
  likeWrapper: {
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  likeText: {
    marginTop: 2,
    fontSize: 10,
    color: '#1f99b0',
    textAlign: 'center',
  },
})
