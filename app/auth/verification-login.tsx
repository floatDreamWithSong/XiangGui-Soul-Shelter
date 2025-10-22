import { Input, InputField, InputIcon, InputSlot } from '@/components/gluestack-ui/input';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { AppleIcon, DogIcon, SmartphoneIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerificationLogin() {
  return (
    <SafeAreaView className="flex-1 items-center justify-around gap-8">
      <View className="mt-5 flex-col items-center gap-4">
        <Icon as={DogIcon} className="size-16 stroke-primary-foreground-dark" />
        <View className="flex-col items-center gap-2">
          <Text className="text-3xl text-primary-foreground">输入手机号</Text>
          <Text className="text-3xl text-primary-foreground">登录向归</Text>
        </View>
        <View className="mt-8 gap-2">
          <Text className="ml-1 text-primary-foreground-light">手机号</Text>
          <Input className="h-14 w-72 rounded-full border-[#9BB167]">
            <InputSlot className="pl-4">
              <InputIcon as={SmartphoneIcon} />
            </InputSlot>
            <InputField placeholder="请输入手机号" />
          </Input>
          <Button
            onPress={() => router.push('/auth/verification-code')}
            className="my-2 h-14 w-72 rounded-full">
            <Text className="text-xl text-white">发送验证码</Text>
          </Button>
          <Text className="text-center text-sm text-primary-foreground-light">
            未注册手机号会直接帮您注册
          </Text>
        </View>
      </View>
      <View className="mb-10 flex flex-col items-center justify-center gap-4">
        <Button className="aspect-square rounded-full bg-white" variant={'outline'}>
          <Icon as={AppleIcon} />
        </Button>
      </View>
    </SafeAreaView>
  );
}
