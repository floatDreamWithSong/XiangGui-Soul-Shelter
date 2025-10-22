import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { DogIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OTPInput, type SlotProps } from 'input-otp-native';
import type { OTPInputRef } from 'input-otp-native';
import { useEffect, useRef } from 'react';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';
import { cn } from '@/lib/utils';

export default function VerificationCode() {
  const ref = useRef<OTPInputRef>(null);
  const onComplete = (otp: string) => {
    console.log(otp);
  };
  return (
    <SafeAreaView className="flex-1 items-center gap-8">
      <View className="mt-12 flex-col items-center gap-4">
        <Icon as={DogIcon} className="size-16 stroke-primary-foreground-dark" />
        <View className="flex-col items-center gap-2">
          <Text className="text-3xl text-primary-foreground">我们已将验证码</Text>
          <Text className="text-3xl text-primary-foreground">发送至</Text>
          <Text className="text-3xl text-primary-foreground">13800138000</Text>
          <Text className="text-xl text-primary-foreground">请在下方输入收到的验证码</Text>
        </View>
        <View className="mt-2 flex items-center justify-center gap-2">
          <OTPInput
            ref={ref}
            onComplete={onComplete}
            maxLength={6}
            render={({ slots }) => (
              <View className="my-4 flex-row items-center justify-center gap-2">
                {slots.map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </View>
            )}
          />
          <Text className="text-center text-sm text-primary-foreground-light">未收到验证码？</Text>
          <Button className="my-2 h-14 w-72 rounded-full">
            <Text className="text-xl text-white">重新发送验证码</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

function Slot({ char, isActive, hasFakeCaret }: SlotProps) {
  return (
    <View
      className={cn(
        'aspect-square w-12 items-center justify-center rounded-lg border border-gray-200 bg-white',
        {
          'border-2 border-primary-green-dark': isActive,
        }
      )}>
      {char !== null && (
        <Text className="text-2xl font-medium text-primary-green-dark">{char}</Text>
      )}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

function FakeCaret() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0, { duration: 500 }), withTiming(1, { duration: 500 })),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle = {
    width: 2,
    height: 28,
    borderRadius: 1,
  };

  return (
    <View className="absolute h-full w-full items-center justify-center">
      <Animated.View className="bg-primary-green-dark" style={[baseStyle, animatedStyle]} />
    </View>
  );
}
