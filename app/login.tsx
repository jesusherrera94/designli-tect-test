import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';

import config from '../auth-config.js';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalStorage } from '@/hooks/useLocalStorage';

WebBrowser.maybeCompleteAuthSession();

const auth0Domain = Constants.expoConfig?.extra?.auth0Domain;
const auth0ClientId = Constants.expoConfig?.extra?.auth0ClientId;

export default function Login() {
  const [verificationUrl, setVerificationUrl] = useState<string | null>(null);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      clientSecret: config.secret,
      scopes: ['openid', 'profile', 'email', 'address', 'phone'],
      redirectUri: AuthSession.makeRedirectUri(),
    },
    {
      authorizationEndpoint: `https://${auth0Domain}/authorize`,
      tokenEndpoint: `https://${auth0Domain}/oauth/token`,
      revocationEndpoint: `https://${auth0Domain}/oauth/revoke`,
      userInfoEndpoint: `https://${auth0Domain}/userinfo`,
    }
  );
  const { setItem, getItem } = useLocalStorage();
  const navigation = useNavigation<any>();
  let intervalData: NodeJS.Timeout | null = null;

  useEffect(() => {
    const checkLogin = async () => {
      const user = await getItem('userAuth');
      if (user && user.isUserAuth) {
        navigation.navigate('(tabs)');
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    console.log('request:', request);
    if (response?.type === 'success') {
      exchangeCode();
    }
  }, [response]);

  const exchangeCode = async () => {
    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("audience", `https://${auth0Domain}/userinfo`);
      urlencoded.append("scope", "profile email");
      urlencoded.append("client_id", auth0ClientId);
      console.log('Token Request Body:', urlencoded.toString());
      const tokenResponse = await fetch(`https://${auth0Domain}/oauth/device/code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlencoded.toString(),
        redirect: 'follow',
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token request failed: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      setVerificationUrl(tokenData.verification_uri_complete);
      intervalData = setInterval(() => {
        getAccessToken(tokenData.device_code);
      }, 5 * 1000);
      // getAccessToken(tokenData.device_code);
    } catch (error) {
      console.error('Error getting device code for token:', error);
      Alert.alert('Error', 'Authentication failed.');
    }
  };

  const getAccessToken = async (deviceCode: string) => {
    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("device_code", deviceCode);
      urlencoded.append("grant_type", "urn:ietf:params:oauth:grant-type:device_code");
      urlencoded.append("client_id", auth0ClientId);
      console.log('Token Request Body:', urlencoded.toString());
      const tokenResponse = await fetch(`https://${auth0Domain}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlencoded.toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token request failed: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      fetchUserInfo(tokenData.access_token);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };


  const fetchUserInfo = async (accessToken: string) => {
    try {
      const userInfoResponse = await fetch(`https://${auth0Domain}/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!userInfoResponse.ok) {
        throw new Error(`User info request failed: ${userInfoResponse.status}`);
      }

      const userInfo = await userInfoResponse.json();
      setItem('userAuth', { isUserAuth: true, accessToken: accessToken });
      navigation.navigate('(tabs)');
      clearInterval(intervalData!);
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert('Error', 'Could not fetch user info.');
    }
  };

  // logout

  // const handleLogout = async () => {
  //   try {
  //     await AuthSession.revokeAsync(
  //       {
  //         token: userInfo?.access_token,
  //       },
  //       {
  //         revocationEndpoint: `https://${auth0Domain}/v2/logout`,
  //       }
  //     );
  //     setUserInfo(null);
  //     Alert.alert('Logged out', 'You have been logged out successfully.');
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //     Alert.alert('Error', 'Could not log out.');
  //   }
  // };


  return (
    <ThemedView style={styles.container}>
      {verificationUrl ? (
        <View style={styles.verificationContainer}>
          <ThemedText style={styles.verificationText}>Please open the verification link:</ThemedText>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(verificationUrl)}>
            <ThemedText style={styles.buttonText}>Verification</ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          disabled={!promptAsync}
          onPress={() => {
            promptAsync();
          }}
        >
          <ThemedText style={styles.buttonText}>Login with Auth0</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  verificationContainer: {
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});