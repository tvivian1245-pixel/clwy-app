import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SimpleLineIcons from '@react-native-vector-icons/simple-line-icons'

export default function NetworkError({ title = 'Error', onReload }) {
  return (
    <View style={styles.container}>
      <SimpleLineIcons name="drawer" size={160} color="red" />
      <Text>{title}</Text>
      <TouchableOpacity onPress={onReload} style={styles.reload}>
        <Text style={styles.label}>重新加载</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reload: {
    marginTop: 10,
    backgroundColor: '#1f99b0',
    height: 40,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    color: '#fff',
    lineHeight: 40,
  },
})
