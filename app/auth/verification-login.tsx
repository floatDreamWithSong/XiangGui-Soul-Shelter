import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { ArrowRightIcon, DogIcon, PhoneIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {

  return (
    <SafeAreaView className="flex-1 items-center justify-around gap-10">
      <View className="flex-col items-center gap-2 mt-10">
        <Icon as={DogIcon} className="stroke-primary-foreground-dark size-16" />
        <View className="flex-col items-center gap-2">
          <Text className="text-3xl text-primary-foreground">输入手机号</Text>
          <Text className="text-3xl text-primary-foreground">登录向归</Text>
        </View>
      </View>
      <View className='flex-row items-center gap-2'>
          <Icon as={PhoneIcon} className="stroke-primary-foreground-dark size-16" />
          <Input className='w-72 rounded-full' />
      </View>
      <View className="flex flex-col items-center justify-center gap-4 mb-10">
        <Button className="h-14 w-72 rounded-full">
          <Text className="text-xl text-white">开始创建虚拟伙伴</Text>
          <Icon as={ArrowRightIcon} className="absolute right-6 size-5 stroke-white" />
        </Button>
        <Text className="text-primary-foreground-light">
          已有伙伴，可点此
          <Link className="text-primary" href="/auth/verification-login">
            登录
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
