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
    }
  ]);
  return (
    <SafeAreaView>
      <View className="bg-primary-green">
        <View className="flex mt-28 bg-white h-full rounded-3xl flex-col items-center">
          <View className="relative border-2 h-24 aspect-square bg-white rounded-full transform -translate-y-1/2">
            <View className="absolute top-0 left-0 w-full h-full bg-white rounded-full" />
          </View>
          <View className="w-full flex flex-col gap-5">
            {settingList.current.map((item) => (
              <View className="flex flex-row items-center justify-between gap-3 mx-5" key={item.title}>
                <View className="flex flex-row items-center gap-3">
                  <Icon as={item.icon} size={24} color={THEME.brand.foregroundDark} />
                  <Text className="text-primary-foreground-dark font-bold">{item.title}</Text>
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
