import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/gluestack-ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Stack } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import {
  DogIcon,
  SmartphoneIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AppleIcon,
} from 'lucide-react-native';
import { ImageBackground } from "react-native";


export default function Register() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [codeError, setCodeError] = useState("");

  const [toast, setToast] = useState("");
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** 自动清除 Toast */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  /** 倒计时 */
  useEffect(() => {
  // 如果倒计时结束，清掉计时器并退出
  if (countdown <= 0) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    return;
  }

  // 开一个新的计时器
  const id = setTimeout(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  timerRef.current = id;

  // 清理函数：依赖变化或组件卸载时清掉当前这一次的计时器
  return () => {
    clearTimeout(id);
  };
}, [countdown]);


  /** 用户名校验 */
  const validateUsername = () => {
    if (!username) {
      setToast("请输入用户名");
      setUsernameError("请输入用户名");
      return false;
    }

    const reg = /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/;
    if (!reg.test(username)) {
      if (/[^A-Za-z0-9_\u4e00-\u9fa5]/.test(username)) {
        setToast("请勿输入特殊字符");
      }
      setUsernameError("用户名需为2-20位中英文、数字或下划线");
      return false;
    }

    setUsernameError("");
    return true;
  };

  /** 手机号校验 */
  const validatePhone = () => {
    if (!phone) {
      setPhoneError("请输入手机号");
      setToast("请输入手机号");
      return false;
    }

    if (phone.length !== 11) {
      setPhoneError("请输入 11 位有效手机号");
      return false;
    }

    setPhoneError("");
    return true;
  };

  /** 验证码校验 */
  const validateCode = () => {
    if (!code) {
      setCodeError("请输入验证码");
      return false;
    }

    if (code.length !== 6) {
      setCodeError("请输入 6 位有效验证码");
      return false;
    }

    setCodeError("");
    return true;
  };

  /** 获取验证码 */
  const handleGetCode = async () => {
    const uOk = validateUsername();
    const pOk = validatePhone();
    if (!uOk || !pOk) return;

    setCountdown(60);

    await new Promise((r) => setTimeout(r, 800));

    // 模拟失败可切换
    const success = true;

    if (!success) {
      setCountdown(0);
      setToast("验证码发送失败，请检查手机号后重试");
      return;
    }
  };

  /** 注册 */
  const handleRegister = async () => {
    const uOk = validateUsername();
    const pOk = validatePhone();
    const cOk = validateCode();

    if (!uOk || !pOk || !cOk) return;

    await new Promise((r) => setTimeout(r, 800));

    router.replace("/auth/avatar-create");

  };

  return (
    <ImageBackground
    source={require('../../assets/images/bglogin.png')}
    style={{ flex: 1 }}
    resizeMode="cover"
  >
    <SafeAreaView className="flex-1 items-center justify-center gap-4">
      <Stack.Screen options={{ title: '账号注册',
        headerTitleAlign: 'center',
       }} 
       />
       {/* 顶部 */}
      <View style={{ alignItems: 'center', gap: 16 }}>
        <Icon as={DogIcon} size={60} />
      </View>


      {/* 用户名 */}
      <Input className="h-12 w-80 rounded-full border">
        <InputField
          placeholder="请输入用户名"
          value={username}
          onBlur={validateUsername}
          onChangeText={text =>
            setUsername(text.replace(/\s/g, ""))
          }
        />
      </Input>
      {usernameError && <Text className="text-red-500 text-sm">{usernameError}</Text>}

      {/* 手机号 */}
      <Input className="h-12 w-80 rounded-full border">
        <InputField
          keyboardType="number-pad"
          placeholder="请输入手机号"
          value={phone}
          onChangeText={v => setPhone(v.replace(/\D/g, "").slice(0, 11))}
        />
      </Input>
      {phoneError && <Text className="text-red-500 text-sm">{phoneError}</Text>}

      {/* 获取验证码按钮 */}
      <Button
        className="h-12 w-80 rounded-full"
        disabled={countdown > 0 || !username || phone.length !== 11}
        onPress={handleGetCode}
      >
        <Text className="text-white text-lg">
          {countdown > 0 ? `${countdown}s 后重新获取` : "获取验证码"}
        </Text>
      </Button>

      {/* 验证码 */}
      <Input className="h-12 w-80 rounded-full border">
        <InputField
          keyboardType="number-pad"
          placeholder="请输入验证码"
          value={code}
          onChangeText={v => setCode(v.replace(/\D/g, "").slice(0, 6))}
        />
      </Input>
      {codeError && <Text className="text-red-500 text-sm">{codeError}</Text>}

      {/* 注册 */}
      <Button className="h-12 w-80 rounded-full mt-2" onPress={handleRegister}>
        <Text className="text-white text-lg">注册</Text>
      </Button>

      {/* 跳转登录 */}
      <Text
        className="text-blue-500 mt-2"
        onPress={() => router.replace("/auth/login")}
      >
        已有账号？去登录
      </Text>

      {/* Toast */}
      {toast !== "" && (
        <View className="absolute bottom-10 bg-red-500 px-6 py-2 rounded-xl">
          <Text className="text-white text-lg">{toast}</Text>
        </View>
      )}
    </SafeAreaView>
    </ImageBackground>
  );
}
