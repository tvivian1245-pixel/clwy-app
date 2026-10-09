import { ActivityIndicator, StyleSheet } from 'react-native'

export default function Loading() {
  return <ActivityIndicator size="large" color="#0000ff" style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
