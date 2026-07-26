import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';

console.log('[startup] booting AutoPartsReactNative');

try {
  AppRegistry.registerComponent('AutoPartsReactNative', () => App);
  console.log('[startup] component registered');
} catch (error) {
  console.error('[startup] registration failed', error);
}
