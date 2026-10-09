import { useRouter } from 'expo-router'
import { View, TouchableOpacity } from 'react-native'
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons'

/**
 * 模态页关闭按钮组件
 */
export default function ModalCloseButton() {
  const router = useRouter()

  return (
    <View style={{ padding: 3 }}>
      <TouchableOpacity onPress={() => router.dismiss()}>
        <MaterialDesignIcons name="close" size={30} color="#1f99b0" />
      </TouchableOpacity>
    </View>
  )
}
