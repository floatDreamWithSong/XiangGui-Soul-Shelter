import { Tabs } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { HomeIcon, UserIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        animation: 'shift',
        tabBarActiveTintColor: THEME.brand.green,
        tabBarInactiveTintColor: THEME.brand.foregroundLight,
        tabBarStyle: {
          backgroundColor: THEME[colorScheme ?? 'light'].background,
          borderTopColor: THEME[colorScheme ?? 'light'].border,
        },
        headerStyle: {
          backgroundColor: THEME[colorScheme ?? 'light'].background,
        },
        headerTintColor: THEME[colorScheme ?? 'light'].foreground,
      }}>
      <Tabs.Screen
        name="mine"
        options={{
          title: '我的',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon as={UserIcon} size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon as={HomeIcon} size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="second"
        options={{
          title: '第二页',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon as={UserIcon} size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
