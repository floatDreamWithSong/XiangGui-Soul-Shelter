import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

export default function RegisterScreen() {
  // 初始化各项状态
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [toast, setToast] = useState('');

  // 模拟用户名验证（可保留你的原有逻辑）
  const validateUsername = () => {
    if (!username) {
      setUsernameError('用户名不能为空');
    } else {
      setUsernameError('');
    }
  };

  // 模拟获取验证码（保留倒计时逻辑）
  const handleGetCode = () => {
    if (!username) {
      setUsernameError('请先输入用户名');
      return;
    }
    if (phone.length !== 11) {
      setPhoneError('请输入正确的11位手机号');
      return;
    }
    // 倒计时逻辑
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setToast('验证码已发送');
    setTimeout(() => setToast(''), 2000);
  };

  // 模拟注册逻辑（优化：针对性设置具体报错，用于集中展示）
  const handleRegister = () => {
    // 先清空所有旧报错
    setUsernameError('');
    setPhoneError('');
    setCodeError('');

    // 针对性验证，设置具体报错
    let hasError = false;
    if (!username) {
      setUsernameError('用户名不能为空');
      hasError = true;
    }
    if (phone.length !== 11) {
      setPhoneError('请输入正确的11位手机号');
      hasError = true;
    }
    if (code.length !== 6) {
      setCodeError('请输入6位有效验证码');
      hasError = true;
    }

    // 有报错则提示并返回
    if (hasError) {
      setToast('请修正错误后再注册');
      setTimeout(() => setToast(''), 2000);
      return;
    }

    // 无报错执行注册成功逻辑
    setToast('注册成功');
    setTimeout(() => {
      setToast('');
      router.replace("/auth/login");
    }, 2000);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bglogin.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 20 }}>
        {/* 顶部图标 */}
        <View style={{ alignItems: 'center', marginBottom: 80 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#ffffffff', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>icon</Text>
          </View>
        </View>

         <Stack.Screen options={{ title: '账号注册',
        headerTitleAlign: 'center',
       }} />

        {/* 报错框：仅当有错误时渲染 */}
        {(usernameError || phoneError || codeError) && (
          <View style={{ 
            width: '90%', 
            marginBottom: 16,
            backgroundColor: '#fff5f5', // 浅红色背景
            borderWidth: 1, // 红色边框宽度
            borderColor: 'red', // 红色边框颜色
            padding: 8, // 内边距，让文字不贴边
            borderRadius: 0 
          }}>
            {/* 用户名报错 */}
            {usernameError && (
              <Text style={{ 
                color: '#ff0000', // 大红色文字（比默认red更醒目）
                fontSize: 12, 
                marginBottom: 4,
                textAlign: 'left'
              }}>
                ❌ {usernameError}
              </Text>
            )}
            
            {/* 手机号报错 */}
            {phoneError && (
              <Text style={{ 
                color: '#ff0000', // 大红色文字
                fontSize: 12, 
                marginBottom: 4,
                textAlign: 'left'
              }}>
                ❌ {phoneError}
              </Text>
            )}
            
            {/* 验证码报错 */}
            {codeError && (
              <Text style={{ 
                color: '#ff0000', // 大红色文字
                fontSize: 12, 
                textAlign: 'left'
              }}>
                ❌ {codeError}
              </Text>
            )}
          </View>
        )}

        {/* 1. 用户名输入框  */}
        <View style={{
          width: '90%',
          height: 48,
          borderRadius: 18,
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row', // 核心：改为横向排列，容纳图标+输入框
          paddingHorizontal: 16,
          marginVertical: 4
        }}>
          {/* 小人图标 - 靠左排列，样式统一 */}
          <Text style={{ fontSize: 20, color: '#666', marginRight: 8, width: 24, textAlign: 'center' }}>
            👤
          </Text>
          <TextInput
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
              color: '#333'
            }}
            placeholder="请输入用户名"
            placeholderTextColor="#999"
            value={username}
            onBlur={validateUsername}
            onChangeText={(text) => {
              setUsernameError('');
              setUsername(text.replace(/\s/g, ""));
            }}
          />
        </View>

        {/* 2. 手机号输入框  */}
        <View style={{
          width: '90%',
          height: 48,
          borderRadius: 18,
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row', // 核心：改为横向排列，容纳图标+输入框
          paddingHorizontal: 16,
          marginVertical: 4
        }}>
          {/* 信息/手机图标  */}
          <Text style={{ fontSize: 20, color: '#666', marginRight: 8, width: 24, textAlign: 'center' }}>
            📱
          </Text>
          <TextInput
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
              color: '#333'
            }}
            placeholder="请输入手机号"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            value={phone}
            onChangeText={(v) => {
              setPhoneError('');
              setPhone(v.replace(/\D/g, "").slice(0, 11));
            }}
          />
        </View>

        {/* 3. 验证码输入框 + 内嵌右侧获取验证码按钮  */}
        <View style={{
          width: '90%',
          height: 48,
          borderRadius: 18,
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row', 
          paddingHorizontal: 16,
          marginVertical: 4
        }}>
          {/* 信息/验证码图标 */}
          <Text style={{ fontSize: 20, color: '#666', marginRight: 8, width: 24, textAlign: 'center' }}>
            ℹ️
          </Text>
          <TextInput
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
              color: '#333'
            }}
            placeholder="请输入验证码"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            value={code}
            onChangeText={(v) => {
              setCodeError('');
              setCode(v.replace(/\D/g, "").slice(0, 6));
            }}
          />
          {/* 内嵌右侧小按钮  */}
          <TouchableOpacity
            style={{
              height: 36,
              borderRadius: 18,
              backgroundColor: countdown > 0 ? '#c7c4c4ff' : '#3027b1ff',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 12,
              marginLeft: 8
            }}
            disabled={countdown > 0 || !username || phone.length !== 11}
            onPress={handleGetCode}
          >
            <Text style={{
              color: 'white',
              fontSize: 12,
              fontWeight: '500'
            }}>
              {countdown > 0 ? `${countdown}s 后重新获取` : "获取验证码"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 4. 注册按钮  */}
        <TouchableOpacity
          style={{
            width: '75%',
            height: 48,
            borderRadius: 18,
            backgroundColor: 'hsl(88.8 43.86% 55.294%)',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12
          }}
          onPress={handleRegister}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>注册</Text>
        </TouchableOpacity>

        {/* 5. 跳转登录 */}
        <TouchableOpacity
          style={{ marginTop: 16 }}
          onPress={() => router.replace("/auth/login")}
        >
          <Text style={{ color: '#999', fontSize: 14 }}>已有伙伴，可点此<Text style={{ color: 'hsl(88.8 43.86% 55.294%)', fontSize: 14 }}>登录</Text></Text>
        </TouchableOpacity>

        {/* Toast根据内容切换背景色（成功绿色，错误红色） */}
        {toast !== "" && (
          <View style={{
            position: 'absolute',
            bottom: 50,
            backgroundColor: toast.includes('成功') ? '#00C853' : '#ff0000', 
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{ color: 'white', fontSize: 16 }}>{toast}</Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}
