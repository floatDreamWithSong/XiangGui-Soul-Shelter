import { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

import {
  DogIcon,
  SmartphoneIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AppleIcon,
} from 'lucide-react-native';
import { loginApi } from "@/services/auth";
import { Alert } from "react-native";
import { ImageBackground } from "react-native";
import { Stack } from 'expo-router';

export default function VerificationLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  /** 手机号 */
  const onPhoneChange = (text: string) => {
    const v = text.replace(/\D/g, '').slice(0, 11);
    setPhone(v);
    setPhoneError('');
  };

  /** 密码 */
  const onPasswordChange = (text: string) => {
    setPassword(text.replace(/\s/g, ''));
    setPasswordError('');
  };

  const onLogin = () => {
    if (!phone) return setPhoneError('请输入手机号');
    if (phone.length !== 11) return setPhoneError('请输入 11 位有效手机号');
    if (!password) return setPasswordError('请输入密码');
    if (password.length < 6 || password.length > 20)
      return setPasswordError('密码需为 6-20 位字符');

    const onLogin = async () => {
  if (!phone) return setPhoneError('请输入手机号');
  if (phone.length !== 11) return setPhoneError('请输入 11 位有效手机号');
  if (!password) return setPasswordError('请输入密码');
  if (password.length < 6 || password.length > 20)
    return setPasswordError('密码需为 6-20 位字符');

  try {
    const res = await loginApi({
      mobile: phone,
      password,
      remember_me: true,
    });

    if (res.code === 200) {
      // 登录成功
      console.log("登录成功", res.data);

      // TODO: 保存 token（SecureStore）
      // TODO: 全局更新登录态

      router.replace("/(tabs)");
      return;
    }

    // 后端错误码
    if (res.code === 4201) Alert.alert("提示", "手机号或密码错误");
    else if (res.code === 4202) Alert.alert("提示", "账号被锁定，请30分钟后再试");
    else if (res.code === 4203) Alert.alert("提示", "该手机号未注册");
    else Alert.alert("提示", res.message || "登录失败");
  } catch (e) {
    Alert.alert("错误", "网络异常，请稍后再试");
    console.log(e);
  }
};

  };

  return (
  <ImageBackground
    source={require('../../assets/images/bglogin.png')}
    style={{ flex: 1 }}
    resizeMode="cover"
  >
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Stack.Screen options={{ title: '登录',
        headerTitleAlign: 'center',
       }} />
      {/* 顶部 */}
      <View style={{ alignItems: 'center', gap: 16 }}>
        <Icon as={DogIcon} size={60} />
      </View>

      {/* 表单 */}
      <View style={{ gap: 16 }}>
        {/* 手机号 */}
        <View style={styles.block}>
          <View style={styles.input}>
            <Icon as={SmartphoneIcon} size={20} />
            <TextInput
              value={phone}
              onChangeText={onPhoneChange}
              placeholder="请输入手机号"
              keyboardType="number-pad"
              style={styles.textInput}
            />
          </View>
          <Text style={{ fontSize: 12, color: 'red' }}>{phoneError}</Text>
        </View>

        {/* 密码 */}
        <View style={styles.block}>
          <View style={styles.input}>
            <Icon as={LockIcon} size={20} />
            <TextInput
              value={password}
              onChangeText={onPasswordChange}
              placeholder="请输入密码"
              secureTextEntry={showPassword}
              style={styles.textInput}
            />
            <Pressable onPress={() => setShowPassword(v => !v)}>
              <Icon as={showPassword ? EyeOffIcon : EyeIcon} size={20} />
            </Pressable>
          </View>

          {!!passwordError && (
            <Text style={{ fontSize: 12, color: 'red' }}>{passwordError}</Text>
          )}
        </View>

          {/* 忘记密码 */}
        <Text
          style={{ textAlign: 'center', fontSize: 12, textDecorationLine: 'underline' }}
          onPress={() => router.push('/auth/forgot-password')}
        >
          忘记密码？
        </Text>
        {/* 登录按钮 */}
        <Button onPress={onLogin} className="mt-2 h-14 w-72 rounded-full">
          <Text className="text-xl text-white">登录</Text>
        </Button>

      </View>

      {/* 其他方式 */}
      <Button variant="outline" className="aspect-square rounded-full">
        <Icon as={AppleIcon} />
      </Button>
    </SafeAreaView>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  block: {
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    height: 56,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9BB167',
    borderRadius: 999,
    paddingHorizontal: 16,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
});