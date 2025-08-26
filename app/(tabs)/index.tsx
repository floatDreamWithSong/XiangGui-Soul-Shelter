import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { focusManager, useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { AppState, AppStateStatus, Image, type ImageStyle, Platform, View } from 'react-native';
import axios from 'axios';
import { atom, useAtom } from 'jotai';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  light: {
    title: '首页',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    title: '首页',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ThemeToggle />,
  },
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};
const previousState = atom({
  data: '',
  isFetching: false,
});
// 切换AppState，RN Query切换为 focus 或 blur 状态
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export default function HomeTab() {
  // 监听AppState变化，切换RN query 的 focus 状态
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
  
    return () => subscription.remove()
  }, [])
  const { colorScheme } = useColorScheme();
  const [refetchCount, setRefetchCount] = React.useState(0);
  const [state, setState] = useAtom(previousState);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['ping'],
    queryFn: async () => {
        setRefetchCount(refetchCount + 1);
      const res = await axios.get('http://192.168.31.75:4523/m1/4985137-4643795-default/ping');
      return JSON.stringify(res.data, null, 2);
    },
    refetchOnWindowFocus: true
  });
  React.useEffect(() => {
    setState({ data: data ?? '', isFetching });
  }, [data, isFetching]);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );
  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />
        <View className="gap-2 p-4">
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            1. Edit <Text variant="code">app/(tabs)/index.tsx</Text> to get started.
          </Text>
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            2. Save to see your changes instantly.
          </Text>
        </View>
        <View className="flex-row gap-2">
            <Button onPress={() => refetch()}>
              <Text>{isFetching ? 'Loading...' : 'ok'}</Text>
            </Button>
          <Link href="https://reactnativereusables.com" asChild>
          <Text>Browse the Docs </Text>
          </Link>
          <Link href="https://github.com/founded-labs/react-native-reusables" asChild>
            <Button variant="ghost">
              <Text>Star the Repo</Text>
              <Icon as={StarIcon} />
            </Button>
          </Link>
        </View>
        <Text>{data}</Text>
        <Text>Previous State: {state.data}</Text>
        <Text>Refetch Count: {refetchCount}</Text>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="secondary"
      className="rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
