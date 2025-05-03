import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import { Platform } from 'react-native';

// Define the theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f4511e',
    accent: '#ff8a65',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#212121',
    error: '#b00020',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <AppNavigator />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    ...Platform.select({
      web: {
        height: '100vh',
        width: '100vw',
      },
    }),
  },
});
