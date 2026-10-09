import { NativeTabs } from 'expo-router/unstable-native-tabs'
import { SimpleLineIcons } from '@react-native-vector-icons/simple-line-icons'
import { Tabs } from 'expo-router'
import { Platform, TouchableOpacity } from 'react-native'

/**
 * TabBar 图标组件
 * @param props
 */
function TabBarIcon(props) {
  return <SimpleLineIcons size={25} {...props} />
}

export default function TabLayout() {
  // iOS 使用原生液态玻璃 Tabs
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs tintColor="#1f99b0" disableTransparentOnScrollEdge>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>发现</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf={{ default: 'play.house', selected: 'play.house.fill' }} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="videos">
          <NativeTabs.Trigger.Icon sf={{ default: 'video', selected: 'video.fill' }} />
          <NativeTabs.Trigger.Label>视频课程</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="users">
          <NativeTabs.Trigger.Icon sf={{ default: 'person', selected: 'person.fill' }} />
          <NativeTabs.Trigger.Label>我的</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    )
  }

  // Android 使用传统 JavaScript Tabs
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1f99b0',
        // Android 取消水波纹效果
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            activeOpacity={1}
            style={[props.style, { backgroundColor: 'transparent' }]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '发现',
          tabBarIcon: ({ color }) => <TabBarIcon name="compass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: '视频课程',
          tabBarIcon: ({ color }) => <TabBarIcon name="camrecorder" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}
