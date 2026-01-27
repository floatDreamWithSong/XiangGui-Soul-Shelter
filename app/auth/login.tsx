import { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Alert as NativeAlert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

import {
  SmartphoneIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  MessageCircleIcon,
  UsersIcon,
  CheckIcon
} from 'lucide-react-native';
import { loginApi } from "@/services/auth";
import { ImageBackground } from "react-native";

export default function VerificationLogin() {
  // 核心状态
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
  const [toast, setToast] = useState('');

  /** 手机号输入处理 */
  const onPhoneChange = (text: string) => {
    const pureNumberText = text.replace(/\D/g, '');
    const limitedText = pureNumberText.slice(0, 11);
    setPhone(limitedText);
    setPhoneError('');

    if (text !== '' && pureNumberText.length < text.length) {
      setPhoneError('请输入数字，仅支持 11 位手机号');
    }
  };

  /** 密码输入处理 */
  const onPasswordChange = (text: string) => {
    const noSpaceText = text.replace(/\s/g, '');
    setPassword(noSpaceText);
    setPasswordError('');

    if (noSpaceText.length > 0 && (noSpaceText.length < 6 || noSpaceText.length > 20)) {
      setPasswordError('密码需为 6-20 位中英文、数字或特殊字符');
    }
  };

  /** 重置登录按钮禁用状态 */
  const resetLoginDisabled = () => {
    setIsLoginDisabled(false);
  };

  /** 核心登录逻辑 */
  const onLogin = async () => {
    setPhoneError('');
    setPasswordError('');

    if (!phone) return setPhoneError('请输入手机号');
    if (phone.length !== 11) return setPhoneError('请输入 11 位有效手机号');
    if (!password) return setPasswordError('请输入密码');
    if (password.length < 6 || password.length > 20)
      return setPasswordError('密码需为 6-20 位中英文、数字或特殊字符');

    if (isLoginDisabled) return;
    setIsLoginDisabled(true);

    try {
      const res = await loginApi({
        mobile: phone,
        password,
        remember_me: rememberMe,
      });

      if (res.code === 200) {
        setToast('登录成功');
        setErrorCount(0);
        setTimeout(() => router.replace("/(tabs)"), 1500);
        return;
      }

      setErrorCount(prev => prev + 1);
      const currentErrorCount = errorCount + 1;

      if (res.code === 4201) {
        setPasswordError('密码错误，请重新输入');
        setPassword('');
        if (currentErrorCount >= 3) {
          setToast(`已连续${currentErrorCount}次错误，多次错误将锁定账号`);
        }
      } else if (res.code === 4202) {
        setToast('账号被锁定，请30分钟后再试');
      } else if (res.code === 4203) {
        setPhoneError('该手机号未注册，请先注册');
      } else {
        setToast(res.message || "登录失败");
      }

      if (currentErrorCount >= 3) {
        setIsLoginDisabled(true);
        setTimeout(resetLoginDisabled, 3000);
      }
    } catch (e) {
      setToast('网络异常，请稍后再试');
      console.log("登录请求异常：", e);
    } finally {
      if (errorCount + 1 < 3) {
        setTimeout(resetLoginDisabled, 1500);
      }
      setTimeout(() => setToast(''), 2000);
    }
  };

  /** 微信登录 */
  const onWechatLogin = async () => {
    setToast('微信登录中...');
    setTimeout(() => {
      setToast('微信登录成功');
      setTimeout(() => router.replace("/(tabs)"), 1500);
    }, 1500);
  };

  /** QQ登录 */
  const onQqLogin = async () => {
    setToast('QQ登录中...');
    setTimeout(() => {
      setToast('QQ登录成功');
      setTimeout(() => router.replace("/(tabs)"), 1500);
    }, 1500);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bglogin.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ 
          title: '登录',
          headerTitleAlign: 'center',
        }} />

        {/* 顶部Icon */}
        <View style={styles.topIconContainer}>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>icon</Text>
          </View>
        </View>

        {/* 表单区域 */}
        <View style={styles.formContainer}>
          {/* 手机号输入框 - 增大尺寸 */}
          <View style={styles.inputBlock}>
            <View style={styles.inputWrapper}>
              <Icon as={SmartphoneIcon} size={20} color="#666" />
              <TextInput
                value={phone}
                onChangeText={onPhoneChange}
                placeholder="请输入手机号"
                keyboardType="number-pad"
                style={styles.textInput}
                placeholderTextColor="#999"
              />
            </View>
            {!!phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
          </View>

          {/* 密码输入框 - 增大尺寸 */}
          <View style={styles.inputBlock}>
            <View style={styles.inputWrapper}>
              <Icon as={LockIcon} size={20} color="#666" />
              <TextInput
                value={password}
                onChangeText={onPasswordChange}
                placeholder="请输入密码"
                secureTextEntry={!showPassword} 
                style={styles.textInput}
                placeholderTextColor="#999"
              />
              <Pressable 
                onPress={() => setShowPassword(v => !v)}
                style={styles.eyeIconContainer}
              >
                <Icon 
                  as={showPassword ? EyeOffIcon : EyeIcon} 
                  size={20} 
                  color="#666" 
                />
              </Pressable>
            </View>
            {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          </View>

          {/* 记住我 + 忘记密码 同行排列 */}
          <View style={styles.rememberForgotRow}>
            <Pressable 
              style={({pressed}) => [styles.rememberCheckboxContainer, pressed && {opacity: 0.8}]}
              onPress={() => setRememberMe(prev => !prev)}
            >
              <View style={[
                styles.checkbox, 
                rememberMe && styles.checkboxChecked
              ]}>
                {rememberMe && <Icon as={CheckIcon} size={14} color="#fff" />}
              </View>
              <Text style={styles.rememberText}>记住我</Text>
            </Pressable>

            <Text
              style={styles.forgotPasswordText}
              onPress={() => router.push('/auth/forgot-password')}
            >
              忘记密码？
            </Text>
          </View>

          {/* 登录按钮 - 文字白色+放大字号 */}
          <Button 
            onPress={onLogin} 
            className="mt-2 h-14 w-72 rounded-full"
            disabled={isLoginDisabled}
            style={[
              styles.loginButton,
              isLoginDisabled && styles.loginButtonDisabled
            ]}
          >
            <Text style={styles.loginButtonText}>登录</Text>
          </Button>

          {/* 注册跳转 */}
          <Text
            style={styles.registerText}
            onPress={() => router.push('/auth/register')}
          >
            还未注册？去注册
          </Text>
        </View>

        {/* 第三方登录按钮组 */}
        <View style={styles.thirdPartyLoginContainer}>
          <Text style={styles.thirdPartyTitle}>其他登录方式</Text>
          <View style={styles.thirdPartyButtonGroup}>
            <Button
              variant="outline"
              className="aspect-square rounded-full"
              onPress={onWechatLogin}
            >
              <Icon as={MessageCircleIcon} color="#07C160" size={24} />
            </Button>
            <Button
              variant="outline"
              className="aspect-square rounded-full"
              onPress={onQqLogin}
            >
              <Icon as={UsersIcon} color="#12B7F5" size={24} />
            </Button>
          </View>
        </View>

        {/* Toast提示 */}
        {!!toast && (
          <View style={[
            styles.toastContainer,
            { backgroundColor: toast.includes('成功') ? '#00C853' : '#ff0000' }
          ]}>
            <Text style={styles.toastText}>{toast}</Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  topIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  formContainer: {
    gap: 16,
    alignItems: 'center',
  },
  inputBlock: {
    width: '80%',
    alignSelf: 'center',
  },
  // 核心修改1：增大输入框尺寸（高度从56→64，适度放大）
  inputWrapper: {
    height: 56, // 原56，增大8px，输入更舒适
    width: '110%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9BB167',
    borderRadius: 20,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: '#ffffff',
  },
  textInput: {
    flex: 1,
    fontSize: 16, // 输入文字字号可同步放大，比如改成18
    paddingVertical: 0,
    textAlignVertical: 'center',
    color: '#333',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    marginLeft: 8,
  },
  eyeIconContainer: {
    padding: 4,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9BB167',
    marginTop: 16,
  },
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: -8,
  },
  rememberCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#9BB167',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#9BB167',
    borderColor: '#9BB167',
  },
  rememberText: {
    fontSize: 14,
    color: '#666',
  },
  forgotPasswordText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#666',
  },
  thirdPartyLoginContainer: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  thirdPartyTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  thirdPartyButtonGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  // 登录按钮样式
  loginButton: {
    backgroundColor: 'hsl(88.8 43.86% 55.294%)',
    borderRadius: 999,
    width:200,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#b8d98a',
  },
  // 核心修改2：登录按钮文字样式（白色+放大字号）
  loginButtonText: {
    color: '#ffffff', // 强制白色，避免样式冲突
    fontSize: 22, // 原18，放大到22，更醒目
  },
});
