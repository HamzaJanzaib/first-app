import Colors from '@/constants/color';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TASKS } from '@/constants/task';
import Header from '@/components/Header';

const Index = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]} >
      <ExpoStatusBar style="light" backgroundColor={Colors.background} />

      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {/* header */}
            <Header />
            {/* date selector */}
            {/* filters tabs */}

          </>
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <Text >
          {item.title}
        </Text>}
      />

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
  list: {
    padding: 16,
  }
})