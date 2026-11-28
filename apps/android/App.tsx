import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const capabilities = [
  {
    number: '01',
    title: 'File analysis',
    description: 'Review a file you select before deciding what to do with it.',
    state: 'Engine evaluation required',
  },
  {
    number: '02',
    title: 'Quarantine',
    description: 'Local isolation is enabled only after platform guarantees are verified.',
    state: 'Capability validation required',
  },
  {
    number: '03',
    title: 'Website checks',
    description: 'Check one HTTP or HTTPS address through an approved reputation provider.',
    state: 'Pro and owner activation required',
  },
];

export default function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegistration() {
    setError(null);
    setAccepted(false);

    const apiBase = process.env.EXPO_PUBLIC_API_BASE_URL;
    if (!apiBase) {
      setError(
        'Account registration is unavailable because this build has no API address configured.',
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(apiBase.replace(/\/+$/, '') + '/v1/accounts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json().catch(() => null);

      if (response.status === 202) {
        setAccepted(true);
        setPassword('');
      } else {
        setError(payload?.error?.message ?? 'Account registration could not be completed.');
      }
    } catch {
      setError('The account service could not be reached. Try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  if (showRegistration) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.topbar}>
            <View style={styles.brand}>
              <Text style={styles.brandMark}>Z</Text>
              <Text style={styles.brandName}>zerodeck</Text>
            </View>
            <Pressable accessibilityRole="button" onPress={() => setShowRegistration(false)}>
              <Text style={styles.backAction}>Back</Text>
            </Pressable>
          </View>

          <View style={styles.registerHero}>
            <Text style={styles.eyebrow}>ACCOUNT ACCESS</Text>
            <Text style={styles.registerTitle}>Create your account.</Text>
            <Text style={styles.heroCopy}>
              One account for ZeroDeck on Web and Android. Your email remains unverified until the
              verification flow is enabled.
            </Text>
          </View>

          {accepted ? (
            <Text accessibilityRole="alert" style={styles.successMessage}>
              Your request was accepted. Email verification and sign-in are not enabled in this core
              build yet.
            </Text>
          ) : (
            <View style={styles.form}>
              <Text style={styles.fieldLabel}>Email address</Text>
              <TextInput
                accessibilityLabel="Email address"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                accessibilityLabel="Password"
                autoComplete="new-password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              {error ? (
                <Text accessibilityRole="alert" style={styles.errorMessage}>
                  {error}
                </Text>
              ) : null}
              <Pressable
                accessibilityRole="button"
                disabled={submitting}
                onPress={handleRegistration}
                style={[styles.submitButton, submitting && styles.submitDisabled]}
              >
                {submitting ? (
                  <ActivityIndicator color="#10160d" />
                ) : (
                  <Text style={styles.submitText}>Create account</Text>
                )}
              </Pressable>
            </View>
          )}

          <Text style={styles.footnote}>
            Registration stays disabled until the owner-approved password policy is configured.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
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
          <Text style={styles.heroCopy}>
            Security checks should explain what they know, what they do not know, and what happens
            next.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowRegistration(true)}
            style={styles.createAccountButton}
          >
            <Text style={styles.submitText}>Create account</Text>
          </Pressable>
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
            <View style={styles.stateRow}>
              <View style={styles.stateDot} />
              <Text style={styles.stateText}>{capability.state}</Text>
            </View>
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
  topbar: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#29342e',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: {
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#c8f169',
    color: '#10160d',
    fontSize: 18,
    fontWeight: '800',
  },
  brandName: { color: '#f2f5f1', fontSize: 18, fontWeight: '800', letterSpacing: -1 },
  environment: {
    color: '#c8f169',
    fontSize: 9,
    letterSpacing: 1.5,
    borderWidth: 1,
    borderColor: '#52633d',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },
  backAction: { color: '#c8f169', fontSize: 13, fontWeight: '700', padding: 10 },
  hero: { paddingTop: 78, paddingBottom: 72 },
  registerHero: { paddingTop: 58, paddingBottom: 32 },
  eyebrow: { color: '#c8f169', fontSize: 10, letterSpacing: 1.8, marginBottom: 13 },
  title: { color: '#f2f5f1', fontSize: 54, lineHeight: 56, fontWeight: '800', letterSpacing: -3.5 },
  registerTitle: {
    color: '#f2f5f1',
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '800',
    letterSpacing: -2.6,
  },
  heroCopy: { color: '#9aa79e', fontSize: 15, lineHeight: 24, marginTop: 22, maxWidth: 440 },
  createAccountButton: {
    alignSelf: 'flex-start',
    marginTop: 26,
    backgroundColor: '#c8f169',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
  },
  sectionHeading: { marginBottom: 16 },
  sectionTitle: { color: '#f2f5f1', fontSize: 26, fontWeight: '700', letterSpacing: -1 },
  card: {
    backgroundColor: '#121715',
    borderWidth: 1,
    borderColor: '#29342e',
    borderRadius: 15,
    padding: 21,
    marginBottom: 12,
    minHeight: 196,
  },
  cardNumber: { color: '#c8f169', fontSize: 10, letterSpacing: 1.5 },
  cardTitle: { color: '#f2f5f1', fontSize: 20, fontWeight: '700', marginTop: 27, marginBottom: 8 },
  cardCopy: { color: '#9aa79e', fontSize: 13, lineHeight: 21 },
  stateRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 18 },
  stateDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: '#e7c77b' },
  stateText: { color: '#e7c77b', fontSize: 11, flexShrink: 1 },
  form: { gap: 10 },
  fieldLabel: { color: '#f2f5f1', fontSize: 12, fontWeight: '700', marginTop: 8 },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#29342e',
    borderRadius: 10,
    backgroundColor: '#101512',
    color: '#f2f5f1',
    paddingHorizontal: 13,
    fontSize: 15,
  },
  submitButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#c8f169',
    marginTop: 14,
  },
  submitDisabled: { opacity: 0.6 },
  submitText: { color: '#10160d', fontSize: 13, fontWeight: '800' },
  errorMessage: { color: '#ffd5d1', fontSize: 12, lineHeight: 19, marginTop: 8 },
  successMessage: {
    color: '#c8f169',
    fontSize: 13,
    lineHeight: 21,
    borderWidth: 1,
    borderColor: '#52633d',
    borderRadius: 10,
    padding: 14,
  },
  footnote: { color: '#9aa79e', fontSize: 11, lineHeight: 18, marginTop: 22 },
  footer: { color: '#9aa79e', fontSize: 9, letterSpacing: 1.2, marginTop: 24 },
});
