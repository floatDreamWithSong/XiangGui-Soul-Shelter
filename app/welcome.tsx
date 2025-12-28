import { Button } from '@/components/ui/button';
import { Text } from "react-native";
import { Link } from 'expo-router';
import { View, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import { DogIcon } from "lucide-react-native";
import { ImageBackground } from "react-native";

export default function Welcome() {
  const { height: screenHeight } = useWindowDimensions();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const containerRef = useRef<View>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const imageUri = useRef(require('../assets/images/welcome.png'));


  // 获取图片信息
useEffect(() => {
  const asset = Image.resolveAssetSource(imageUri.current);
  const aspectRatio = asset.width / asset.height;
  setImageAspectRatio(aspectRatio);
  setImageLoaded(true);
}, []);


  // 计算图片尺寸
  useEffect(() => {
    if (imageLoaded && containerHeight > 0) {
      // 根据容器高度和图片比例计算宽度
      const newHeight = containerHeight;
      const newWidth = newHeight * imageAspectRatio;

      setImageSize({
        width: newWidth,
        height: newHeight,
      });
    }
  }, [imageLoaded, containerHeight, imageAspectRatio]);

  // 测量容器高度
  const onContainerLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  return (
    <ImageBackground
  source={require('../assets/images/bglogin.png')}   // 你的背景图 URL 或本地资源
  style={{ flex: 1 }}
  resizeMode="cover"    // cover = 铺满并裁剪，contain = 不裁剪但可能留空
>
    <SafeAreaView
      style={{
      flex: 1,
  }}
>

      <View className="mt-10 flex-col items-center">
  <View
      style={{
        width: "100%",
        alignItems: "center",
        marginTop: 60,
      }}
    >
  <DogIcon size={60} strokeWidth={2} color="#000000ff" />
</View>


       <Text
  style={{
    fontSize: 48,
    textAlign: "center",
    color: "#000000ff",
    marginTop: 40,
  }}
>
  欢迎来到向归
</Text>

<Text
  style={{
    fontSize: 20,
    textAlign: "center",
    color: "#000000ff",
    marginTop: 20,
    lineHeight: 34,
  }}
>
  AI辅助哀伤疗愈的同行者
</Text>

      </View>
      <View ref={containerRef} onLayout={onContainerLayout} style={{ flex: 1 }}>

        {imageLoaded && imageSize.width > 0 && (
          <Image
            source={imageUri.current }
            style={{
              width: imageSize.width,
              height: imageSize.height,
              alignSelf: 'center',
            }}
            className="border-2 border-primary-foreground-light"
            resizeMode="contain"
          />
        )}
      </View>

      <View
  style={{
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Button
    style={{
      height: 56,           // h-14
      width: 288,           // w-72
      borderRadius: 9999,   // rounded-full
      borderWidth: 2,             // 边框粗细
      borderColor: 'hsl(88.8 43.86% 55.294%)',     // 边框颜色（稍深一点的绿，会更好看）
      backgroundColor: 'hsl(88.8 43.86% 55.294%)',   // 绿色底
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Link
      href="/auth/register"
      style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#fdfdfdff',   
        textAlign: 'center',
      }}
    >
      开始创建虚拟伙伴
    </Link>
  </Button>
</View>


    </SafeAreaView>
  </ImageBackground>
  );
}
