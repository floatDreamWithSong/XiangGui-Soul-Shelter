import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { ChevronRightIcon, InfoIcon, UserIcon, UserLockIcon } from 'lucide-react-native';
import { useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Mine() {
  const settingList = useRef([
    {
      title: '账号设置',
      icon: UserIcon,
      link: '/settings',
    },
    {
      title: '隐私设置',
      icon: UserLockIcon,
      link: '/privacy',
    },
    {
      title: '关于',
      icon: InfoIcon,
      link: '/about',
    },
  ]);
  return (
    <SafeAreaView>
      <View className="bg-primary-green">
        <View className="mt-28 flex h-full flex-col items-center rounded-3xl bg-white">
          <View className="relative aspect-square h-24 -translate-y-1/2 transform rounded-full border-2 bg-white">
            <View className="absolute left-0 top-0 h-full w-full rounded-full bg-white" />
          </View>
          <View className="flex w-full flex-col gap-5">
            {settingList.current.map((item) => (
              <View
                className="mx-5 flex flex-row items-center justify-between gap-3"
                key={item.title}>
                <View className="flex flex-row items-center gap-3">
                  <Icon as={item.icon} size={24} color={THEME.brand.foregroundDark} />
                  <Text className="font-bold text-primary-foreground-dark">{item.title}</Text>
                </View>
                <Icon as={ChevronRightIcon} size={24} color={THEME.brand.foregroundDark} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
