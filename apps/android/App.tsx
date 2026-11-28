import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { File } from 'expo-file-system';
import {
  createAndroidFileSelectionAdapter,
  type SelectedAndroidFile,
} from './src/file-selection';
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
import { createSessionStorage } from './src/session-storage';
import { rotateSessionCredential } from './src/session-client';

const sessionStorage = createSessionStorage(SecureStore);
const fileSelection = createAndroidFileSelectionAdapter({
  pickFileAsync: () => File.pickFileAsync(),
});

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

type Screen = 'home' | 'register' | 'login' | 'account' | 'file-analysis';

interface SessionProfile {
  accountId: string;
  sessionId: string;
  email: string;
  emailVerified: boolean;
}

function getApiBaseUrl(): string | null {
  const value = process.env.EXPO_PUBLIC_API_BASE_URL;
  return value ? value.replace(/\/+$/, '') : null;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [profile, setProfile] = useState<SessionProfile | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<SelectedAndroidFile | null>(null);
  const [fileStatus, setFileStatus] = useState('No file selected. Selecting a file does not start analysis.');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const token = await sessionStorage.read();
        if (!token || !active) return;

        const apiBase = getApiBaseUrl();
        if (!apiBase) {
          if (active) setError('A server address is required to restore your session.');
          return;
        }

        const response = await fetch(apiBase + '/v1/session', {
          headers: { authorization: 'Bearer ' + token },
        });

        if (response.status === 401) {
          await sessionStorage.clear();
          return;
        }
        if (!response.ok) {
          if (active) setError('Your stored session could not be verified. Try again later.');
          return;
        }

        const restored = (await response.json()) as SessionProfile;
        if (active) {
          setProfile(restored);
          setScreen('account');
        }
      } catch {
        if (active) setError('Secure session storage or the account service is unavailable.');
      }
    }

    void restoreSession();
    return () => {
      active = false;
    };
  }, []);

  async function handlePickFile() {
    setFileStatus('Opening the Android document picker…');
    try {
      const selected = await fileSelection.select();
      setSelectedFile(selected);
      setFileStatus(
        selected
          ? 'File selected. No file content has been read and no analysis has started.'
          : 'Selection cancelled. No file content was read.',
      );
    } catch {
      setSelectedFile(null);
      setFileStatus('The selected file is unavailable or could not be accessed. Select it again.');
    }
  }

  function clearSelectedFile() {
    setSelectedFile(null);
    setFileStatus('Selection cleared. No file content was read.');
  }

  async function handleRegistration() {
    setError(null);
    setAccepted(false);
    const apiBase = getApiBaseUrl();

    if (!apiBase) {
      setError(
        'Account registration is unavailable because this build has no API address configured.',
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(apiBase + '/v1/accounts', {
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

  async function handleLogin() {
    setError(null);
    const apiBase = getApiBaseUrl();

    if (!apiBase) {
      setError('Sign-in is unavailable because this build has no API address configured.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(apiBase + '/v1/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok || typeof payload?.sessionToken !== 'string') {
        setError(payload?.error?.message ?? 'Sign-in could not be completed.');
        return;
      }

      const token = payload.sessionToken as string;
      try {
        await sessionStorage.write(token);
      } catch {
        await fetch(apiBase + '/v1/sessions/current', {
          method: 'DELETE',
          headers: { authorization: 'Bearer ' + token },
        }).catch(() => undefined);
        setError('Secure storage is unavailable. The new session was not saved on this device.');
        return;
      }

      const profileResponse = await fetch(apiBase + '/v1/session', {
        headers: { authorization: 'Bearer ' + token },
      });
      if (!profileResponse.ok) {
        await sessionStorage.clear();
        setError('The new session could not be verified.');
        return;
      }

      const nextProfile = (await profileResponse.json()) as SessionProfile;
      setProfile(nextProfile);
      setLoginPassword('');
      setScreen('account');
    } catch {
      setError('The account service or secure storage could not be reached.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRotateSession() {
    setError(null);
    setSubmitting(true);
    try {
      const token = await sessionStorage.read();
      const apiBase = getApiBaseUrl();
      if (!token || !apiBase) {
        setError('A valid session and account service are required to rotate this credential.');
        return;
      }
      const rotated = await rotateSessionCredential(apiBase, token, sessionStorage);
      if (profile) setProfile({ ...profile, sessionId: rotated.sessionId });
      setError('Session credential rotated. The previous credential can no longer be used.');
    } catch (rotationError) {
      setError(
        rotationError instanceof Error
          ? rotationError.message
          : 'The session credential could not be rotated.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut(path: '/v1/sessions/current' | '/v1/sessions/logout-all') {
    setError(null);
    setSubmitting(true);
    let revocationConfirmed = false;

    try {
      const token = await sessionStorage.read();
      const apiBase = getApiBaseUrl();

      if (!token) {
        revocationConfirmed = true;
      } else if (apiBase) {
        try {
          const response = await fetch(apiBase + path, {
            method: path.endsWith('logout-all') ? 'POST' : 'DELETE',
            headers: { authorization: 'Bearer ' + token },
          });
          revocationConfirmed = response.ok || response.status === 401;
        } catch {
          revocationConfirmed = false;
        }
      }

      await sessionStorage.clear();
      setProfile(null);
      setScreen('home');
      if (!revocationConfirmed) {
        setError(
          'The local session was cleared, but server-side revocation could not be confirmed.',
        );
      }
    } catch {
      setError('Secure session storage could not be accessed. Sign-out is not confirmed.');
    } finally {
      setSubmitting(false);
    }
  }

  if (screen === 'register') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.topbar}>
            <Brand />
            <Pressable accessibilityRole="button" onPress={() => setScreen('home')}>
              <Text style={styles.backAction}>Back</Text>
            </Pressable>
          </View>
          <View style={styles.registerHero}>
            <Text style={styles.eyebrow}>ACCOUNT ACCESS</Text>
            <Text style={styles.registerTitle}>Create your account.</Text>
            <Text style={styles.heroCopy}>
              One account for ZeroDeck on Web and Android. Your email remains unverified until
              verification delivery is configured.
            </Text>
          </View>
          {accepted ? (
            <Text accessibilityRole="alert" style={styles.successMessage}>
              Your request was accepted. New account creation remains disabled until the
              owner-approved password policy is configured.
            </Text>
          ) : (
            <View style={styles.form}>
              <Text style={styles.fieldLabel}>Email address</Text>
              <TextInput
                accessibilityLabel="Email address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
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
              <PrimaryButton
                label="Create account"
                submitting={submitting}
                onPress={handleRegistration}
              />
            </View>
          )}
          <Text style={styles.footnote}>
            Already have an account?{' '}
            <Text style={styles.inlineLink} onPress={() => setScreen('login')}>
              Sign in
            </Text>
          </Text>
          <Text style={styles.footnote}>
            Registration stays disabled until the owner-approved password policy is configured.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'login') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.topbar}>
            <Brand />
            <Pressable accessibilityRole="button" onPress={() => setScreen('home')}>
              <Text style={styles.backAction}>Back</Text>
            </Pressable>
          </View>
          <View style={styles.registerHero}>
            <Text style={styles.eyebrow}>ACCOUNT ACCESS</Text>
            <Text style={styles.registerTitle}>Welcome back.</Text>
            <Text style={styles.heroCopy}>Sign in to your ZeroDeck account.</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.fieldLabel}>Email address</Text>
            <TextInput
              accessibilityLabel="Email address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              value={loginEmail}
              onChangeText={setLoginEmail}
              style={styles.input}
            />
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              accessibilityLabel="Password"
              autoComplete="current-password"
              secureTextEntry
              value={loginPassword}
              onChangeText={setLoginPassword}
              style={styles.input}
            />
            {error ? (
              <Text accessibilityRole="alert" style={styles.errorMessage}>
                {error}
              </Text>
            ) : null}
            <PrimaryButton label="Sign in" submitting={submitting} onPress={handleLogin} />
          </View>
          <Text style={styles.footnote}>
            New to ZeroDeck?{' '}
            <Text style={styles.inlineLink} onPress={() => setScreen('register')}>
              Create an account
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'file-analysis') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topbar}>
            <Brand />
            <Pressable accessibilityRole="button" onPress={() => setScreen('home')}>
              <Text style={styles.backAction}>Back</Text>
            </Pressable>
          </View>
          <View style={styles.registerHero}>
            <Text style={styles.eyebrow}>MVP-01 · MANUAL FILE ANALYSIS</Text>
            <Text style={styles.registerTitle}>Choose a file to review.</Text>
            <Text style={styles.heroCopy}>
              Select one file explicitly. Selection does not start a scan or read file contents.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={handlePickFile}
            style={styles.createAccountButton}
          >
            <Text style={styles.submitText}>Choose file</Text>
          </Pressable>
          {selectedFile ? (
            <View style={styles.card}>
              <Text style={styles.cardNumber}>SELECTED FILE</Text>
              <Text style={styles.cardTitle}>{selectedFile.name}</Text>
              <Text style={styles.cardCopy}>
                {selectedFile.sizeBytes} bytes · {selectedFile.declaredType}
              </Text>
              <Pressable accessibilityRole="button" onPress={clearSelectedFile}>
                <Text style={styles.backAction}>Remove selection</Text>
              </Pressable>
            </View>
          ) : null}
          <Text accessibilityRole="alert" style={styles.fileStatus}>
            {fileStatus}
          </Text>
          <Pressable accessibilityRole="button" disabled style={styles.disabledFileButton}>
            <Text style={styles.disabledFileButtonText}>Analysis engine not configured</Text>
          </Pressable>
          <Text style={styles.footnote}>
            The selected file stays on this device. ZeroDeck has not read or uploaded its contents.
            File-type coverage and size limits are not yet approved; no security verdict is available.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'account' && profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topbar}>
            <Brand />
            <Text style={styles.environment}>ACCOUNT</Text>
          </View>
          <View style={styles.registerHero}>
            <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
            <Text style={styles.registerTitle}>You are signed in.</Text>
            <Text style={styles.heroCopy}>{profile.email}</Text>
            <Text style={profile.emailVerified ? styles.verified : styles.unverified}>
              {profile.emailVerified ? 'EMAIL VERIFIED' : 'EMAIL NOT VERIFIED'}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => setScreen('file-analysis')}
            style={styles.fileHomeAction}
          >
            <Text style={styles.fileHomeActionText}>Open file analysis</Text>
          </Pressable>
          {error ? (
            <Text accessibilityRole="alert" style={styles.errorMessage}>
              {error}
            </Text>
          ) : null}
          <View style={styles.form}>
            <Pressable
              accessibilityRole="button"
              disabled={submitting}
              onPress={handleRotateSession}
              style={[styles.secondaryButton, submitting && styles.submitDisabled]}
            >
              <Text style={styles.secondaryButtonText}>Rotate session credential</Text>
            </Pressable>
            <PrimaryButton
              label="Sign out"
              submitting={submitting}
              onPress={() => handleSignOut('/v1/sessions/current')}
            />
            <Pressable
              accessibilityRole="button"
              disabled={submitting}
              onPress={() => handleSignOut('/v1/sessions/logout-all')}
              style={[styles.secondaryButton, submitting && styles.submitDisabled]}
            >
              <Text style={styles.secondaryButtonText}>Sign out all devices</Text>
            </Pressable>
          </View>
          <Text style={styles.footnote}>
            Session expiry is enforced by the server after seven days of inactivity or thirty days
            from sign-in.
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
          <Brand />
          <Text style={styles.environment}>CORE BUILD</Text>
        </View>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>PERSONAL SECURITY WORKSPACE</Text>
          <Text style={styles.title}>See clearly.{'\n'}Stay in control.</Text>
          <Text style={styles.heroCopy}>
            Security checks should explain what they know, what they do not know, and what happens
            next.
          </Text>
          <View style={styles.heroActions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setError(null);
                setScreen('login');
              }}
              style={styles.createAccountButton}
            >
              <Text style={styles.submitText}>Sign in</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setError(null);
                setScreen('register');
              }}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Create account</Text>
            </Pressable>
          </View>
          {error ? (
            <Text accessibilityRole="alert" style={styles.errorMessage}>
              {error}
            </Text>
          ) : null}
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

function Brand() {
  return (
    <View style={styles.brand}>
      <Text style={styles.brandMark}>Z</Text>
      <Text style={styles.brandName}>zerodeck</Text>
    </View>
  );
}

function PrimaryButton({
  label,
  submitting,
  onPress,
}: {
  label: string;
  submitting: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={submitting}
      onPress={onPress}
      style={[styles.submitButton, submitting && styles.submitDisabled]}
    >
      {submitting ? (
        <ActivityIndicator color="#10160d" />
      ) : (
        <Text style={styles.submitText}>{label}</Text>
      )}
    </Pressable>
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
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 26 },
  createAccountButton: {
    alignSelf: 'flex-start',
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
  secondaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#52633d',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  secondaryButtonText: { color: '#c8f169', fontSize: 13, fontWeight: '700' },
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
  inlineLink: { color: '#c8f169', fontWeight: '700' },
  verified: { color: '#c8f169', fontSize: 10, letterSpacing: 1.5, marginTop: 20 },
  unverified: { color: '#e7c77b', fontSize: 10, letterSpacing: 1.5, marginTop: 20 },
  footer: { color: '#9aa79e', fontSize: 9, letterSpacing: 1.2, marginTop: 24 },
  fileHomeAction: {
    alignSelf: 'flex-start',
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#52633d',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fileHomeActionText: { color: '#c8f169', fontSize: 12, fontWeight: '800' },
  fileStatus: {
    color: '#f2f5f1',
    backgroundColor: '#121715',
    borderWidth: 1,
    borderColor: '#29342e',
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
    fontSize: 12,
    lineHeight: 19,
  },
  disabledFileButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#222a25',
    marginTop: 14,
  },
  disabledFileButtonText: { color: '#9aa79e', fontSize: 12, fontWeight: '700' },
});
