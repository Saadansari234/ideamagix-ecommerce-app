import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage successfully cleared');
  } catch (e) {
    console.error('Failed to clear AsyncStorage', e);
  }
};

// Call this function when you need to clear the storage
export default clearAsyncStorage