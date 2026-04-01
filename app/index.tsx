import Colors from '@/constants/color';
import {  StyleSheet, Text, View } from 'react-native';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Index = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]} >
      <ExpoStatusBar style="light" backgroundColor={Colors.background} />
      <Text>First App</Text>
    </View>
  )
}
export default Index


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: Colors.background,
  color: Colors.textPrimary,
},
})