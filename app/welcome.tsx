import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { ArrowRightIcon, DogIcon } from 'lucide-react-native';
import { View, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';

export default function Welcome() {
  const { height: screenHeight } = useWindowDimensions();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const containerRef = useRef<View>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const imageUri = useRef('https://tc.alcy.cc/i/2025/07/29/6887a58dc97a9.webp');

  // 获取图片信息
  useEffect(() => {
    const getImageInfo = async () => {
      try {
        const response = await fetch(imageUri.current);
        if (response.ok) {
          // 获取图片的实际尺寸
          const imageUri = response.url;
          
          // 创建一个Image组件来获取图片尺寸
          Image.getSize(
            imageUri,
            (width, height) => {
              const aspectRatio = width / height;
              setImageAspectRatio(aspectRatio);
              setImageLoaded(true);
            },
            (error) => {
              console.error('获取图片尺寸失败:', error);
              // 如果获取失败，使用默认比例
              setImageAspectRatio(270 / 330);
              setImageLoaded(true);
            }
          );
        }
      } catch (error) {
        console.error('获取图片失败:', error);
        // 如果获取失败，使用默认比例
        setImageAspectRatio(270 / 330);
        setImageLoaded(true);
      }
    };

    getImageInfo();
  }, []);

  // 计算图片尺寸
  useEffect(() => {
    if (imageLoaded && containerHeight > 0) {
      // 根据容器高度和图片比例计算宽度
      const newHeight = containerHeight;
      const newWidth = newHeight * imageAspectRatio;
      
      setImageSize({
        width: newWidth,
        height: newHeight
      });
    }
  }, [imageLoaded, containerHeight, imageAspectRatio]);

  // 测量容器高度
  const onContainerLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-around gap-10">
      <View className="flex-col items-center gap-2 mt-10">
        <Icon as={DogIcon} className="stroke-primary-foreground-dark size-16" />
        <View className="flex-col items-center gap-2">
          <Text className="text-3xl text-primary-foreground">欢迎使用</Text>
          <Text className="text-3xl text-primary-foreground">向归</Text>
        </View>
        <Text className="text-primary-foreground-light text-base">AI辅助治疗哀伤疗愈的先行者</Text>
      </View>
      <View 
        ref={containerRef}
        className="flex-1"
        onLayout={onContainerLayout}
      >
        {imageLoaded && imageSize.width > 0 && (
          <Image
            source={{ uri: imageUri.current }}
            style={{ 
              width: imageSize.width, 
              height: imageSize.height,
              alignSelf: 'center'
            }}
            className='border-2 border-primary-foreground-light'
            resizeMode="contain"
          />
        )}
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
