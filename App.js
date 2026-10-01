import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>EXPO PRODUCT EXPLORER</Text>
      <Text style={styles.name}>Muhammad Dawood Javed</Text>
      <Text style={styles.rollNumber}>Roll No. 23i-3038</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  eyebrow: {
    color: '#67E8F9',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 18,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '800',
    textAlign: 'center',
  },
  rollNumber: {
    color: '#CBD5E1',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
});
