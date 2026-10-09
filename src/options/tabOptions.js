import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { StyleSheet, TouchableOpacity } from 'react-native'
import SimpleLineIcons from '@react-native-vector-icons/simple-line-icons'

/**
 * 导航栏 Logo 组件
 */
function LogoTitle() {
  return (
    <Image source={require('@/assets/logo-light.png')} style={styles.logo} contentFit="contain" />
  )
}

/**
 * 导航栏按钮组件
 * @param props
 */
function HeaderButton(props) {
  const { name, ...rest } = props
  return (
    <Link asChild {...rest}>
      <TouchableOpacity>
        <SimpleLineIcons size={20} color="#1f99b0" name={props.name} />
      </TouchableOpacity>
    </Link>
  )
}
export default function tabOptions() {
  return {
    headerTitleAlign: 'center', // 安卓标题栏居中
    headerTitle: (props) => <LogoTitle {...props} />,
    headerLeft: () => <HeaderButton name="bell" href="/articles" style={styles.headerButton} />,
    headerRight: () => (
      <>
        <HeaderButton
          name="magnifier"
          href="/search"
          style={[styles.headerButton, styles.searchButton]}
        />
        <HeaderButton name="options" href="/settings" style={styles.headerButton} />
      </>
    ),
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 135,
    height: 35,
  },
  headerButton: {
    padding: 8,
  },
  searchButton: {
    marginRight: 8,
  },
})
