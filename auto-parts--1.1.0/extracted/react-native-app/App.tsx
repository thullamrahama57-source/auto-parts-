import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from './src/theme';
import { AppNavigator } from './src/navigation/AppNavigator';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[startup] render crash', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <StartupFallback message={this.state.error.message || 'The app could not start safely.'} />;
    }
    return this.props.children;
  }
}

let SafeAreaProvider: any = null;
let PaperProvider: any = null;
let NavigationContainer: any = null;

try {
  ({ SafeAreaProvider } = require('react-native-safe-area-context'));
  ({ PaperProvider } = require('react-native-paper'));
  ({ NavigationContainer } = require('@react-navigation/native'));
} catch (error) {
  console.error('[startup] provider initialization failed', error);
}

function StartupFallback({ message }: { message: string }) {
  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackTitle}>Auto Parts</Text>
      <Text style={styles.fallbackMessage}>{message}</Text>
    </View>
  );
}

export default function App() {
  const content = useMemo(() => {
    if (!SafeAreaProvider || !PaperProvider || !NavigationContainer) {
      return <StartupFallback message="Starting the marketplace app…" />;
    }

    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }, []);

  return (
    <View style={styles.appContainer}>
      <ErrorBoundary>{content}</ErrorBoundary>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
  },
  fallbackTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  fallbackMessage: {
    color: '#DBEAFE',
    fontSize: 14,
    textAlign: 'center',
  },
});
