import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowRightIcon } from 'lucide-react-native';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function SecondTab() {
  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <View className="gap-4 items-center">
        <Text className="text-2xl font-bold text-center">第二页</Text>
        <Text className="text-muted-foreground text-center">
          这是一个简单的第二页，点击下面的按钮进入更深层的路由页面
        </Text>
      </View>
      
      <Link href="/deep-page" asChild>
        <Button className="flex-row items-center gap-2">
          <Text>进入深层页面</Text>
          <Icon as={ArrowRightIcon} size={20} />
        </Button>
      </Link>
    </View>
  );
}
