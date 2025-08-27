import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { View, Text, Platform, AppStateStatus, AppState } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { CircleCheckBigIcon, CircleXIcon, InfoIcon } from 'lucide-react-native';
import { useEffect } from 'react';
export { ErrorBoundary } from 'expo-router';
/**
 * @description Tanstack Query Client
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
/**
 * @description 切换AppState，RN Query切换为 focus 或 blur 状态
 * @param status - The status of the app state
 */
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

/**
 * @description Root Layout
 */
export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme() ?? { colorScheme: 'light' };
  /**
   * @description Copy to clipboard， for Tanstack Query DevTools use
   * @param text - The text to copy
   * @returns boolean
   */
  const onCopy = async (text: string) => {
    try {
      Clipboard.setString(text);
      return true;
    } catch {
      return false;
    }
  };
  /**
   * @description 监听AppState变化，切换RN query 的 focus 状态，以实现全局的窗口聚焦和失焦重获取数据
   */
  useEffect(() => {
    setColorScheme('light');
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="auth/verification-login" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="auth/verification-code" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="welcome" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen
            name="deep-page"
            options={{ headerShown: true, presentation: 'modal', animation: 'slide_from_right' }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
      <DevToolsBubble onCopy={onCopy} queryClient={queryClient} />
      {/* Custom Toast Component for Success and Error */}
      <Toast
        config={{
          success: ({ text1 }) => (
            <View className="flex h-fit flex-row gap-2 rounded-lg bg-primary p-3">
              <View>
                <Icon as={CircleCheckBigIcon} className="stroke-green-600" />
              </View>
              <View>
                <Text>{text1}</Text>
              </View>
            </View>
          ),
          error: ({ text1 }) => (
            <View className="flex h-fit flex-row gap-2 rounded-lg bg-primary p-3">
              <View>
                <Icon as={CircleXIcon} className="stroke-red-600" />
              </View>
              <View>
                <Text>{text1}</Text>
              </View>
            </View>
          ),
          info: ({ text1 }) => (
            <View className="flex h-fit flex-row gap-2 rounded-lg bg-primary p-3">
              <View>
                <Icon as={InfoIcon} className="stroke-black" />
              </View>
              <View>
                <Text>{text1}</Text>
              </View>
            </View>
          ),
        }}
      />
    </QueryClientProvider>
  );
}
