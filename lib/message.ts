import Toast from 'react-native-toast-message';

const message = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    });
  },
  error: (message: string) => {
    Toast.show({
      type: 'error',
      text1: message,
    });
  },
  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
    });
  },
};
export default message;
