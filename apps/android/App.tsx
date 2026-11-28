import { StatusBar } from 'react-native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const capabilities = [
  { number: '01', title: 'File analysis', description: 'Review a file you select before deciding what to do with it.', state: 'Engine evaluation required' },
  { number: '02', title: 'Quarantine', description: 'Local isolation is enabled only after platform guarantees are verified.', state: 'Capability validation required' },
  { number: '03', title: 'Website checks', description: 'Check one HTTP or HTTPS address through an approved reputation provider.', state: 'Pro and owner activation required' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0e0d" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topbar}>
          <View style={styles.brand}>
            <Text style={styles.brandMark}>Z</Text>
            <Text style={styles.brandName}>zerodeck</Text>
          </View>
          <Text style={styles.environment}>CORE BUILD</Text>
        </View>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>PERSONAL SECURITY WORKSPACE</Text>
          <Text style={styles.title}>See clearly.{'\n'}Stay in control.</Text>
          <Text style={styles.heroCopy}>Security checks should explain what they know, what they do not know, and what happens next.</Text>
        </View>
        <View style={styles.sectionHeading}>
          <Text style={styles.eyebrow}>YOUR TOOLS</Text>
          <Text style={styles.sectionTitle}>Core capabilities</Text>
        </View>
        {capabilities.map((capability) => (
          <View key={capability.number} style={styles.card}>
            <Text style={styles.cardNumber}>{capability.number}</Text>
            <Text style={styles.cardTitle}>{capability.title}</Text>
            <Text style={styles.cardCopy}>{capability.description}</Text>
            <View style={styles.stateRow}><View style={styles.stateDot} /><Text style={styles.stateText}>{capability.state}</Text></View>
          </View>
        ))}
        <Text style={styles.footer}>ZERO DECK · CHECKS ARE NOT GUARANTEES OF SAFETY</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0b0e0d' },
  container: { paddingHorizontal: 22, paddingBottom: 38 },
  topbar: { minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#29342e' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: { width: 30, height: 30, textAlign: 'center', textAlignVertical: 'center', overflow: 'hidden', borderRadius: 8, backgroundColor: '#c8f169', color: '#10160d', fontSize: 18, fontWeight: '800' },
  brandName: { color: '#f2f5f1', fontSize: 18, fontWeight: '800', letterSpacing: -1 },
  environment: { color: '#c8f169', fontSize: 9, letterSpacing: 1.5, borderWidth: 1, borderColor: '#52633d', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 20 },
  hero: { paddingTop: 78, paddingBottom: 72 },
  eyebrow: { color: '#c8f169', fontSize: 10, letterSpacing: 1.8, marginBottom: 13 },
  title: { color: '#f2f5f1', fontSize: 54, lineHeight: 56, fontWeight: '800', letterSpacing: -3.5 },
  heroCopy: { color: '#9aa79e', fontSize: 15, lineHeight: 24, marginTop: 22, maxWidth: 440 },
  sectionHeading: { marginBottom: 16 },
  sectionTitle: { color: '#f2f5f1', fontSize: 26, fontWeight: '700', letterSpacing: -1 },
  card: { backgroundColor: '#121715', borderWidth: 1, borderColor: '#29342e', borderRadius: 15, padding: 21, marginBottom: 12, minHeight: 196 },
  cardNumber: { color: '#c8f169', fontSize: 10, letterSpacing: 1.5 },
  cardTitle: { color: '#f2f5f1', fontSize: 20, fontWeight: '700', marginTop: 27, marginBottom: 8 },
  cardCopy: { color: '#9aa79e', fontSize: 13, lineHeight: 21 },
  stateRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 18 },
  stateDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: '#e7c77b' },
  stateText: { color: '#e7c77b', fontSize: 11, flexShrink: 1 },
  footer: { color: '#9aa79e', fontSize: 9, letterSpacing: 1.2, marginTop: 24 },
});
