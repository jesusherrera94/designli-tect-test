import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Auth0Provider} from 'react-native-auth0';
import config from '../auth-config.js';
import { FinhubConfigsProvider } from '../context/FinhubProvider';
import { LocalStorageProvider } from '../context/LocalStorage';


import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <LocalStorageProvider>
        <FinhubConfigsProvider>
          <Auth0Provider domain={config.domain} clientId={config.clientId}>
            <Stack >
              <Stack.Screen name="index" redirect />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </Auth0Provider>
        </FinhubConfigsProvider>
      </LocalStorageProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
