import {AppRegistry} from 'react-native';
import {LogBox} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';

// LogBox.ignoreAllLogs(false); // log all errors

// ErrorUtils.setGlobalHandler((error, isFatal) => {
//   console.error('Caught global error:', error, isFatal);
// });

AppRegistry.registerComponent(appName, () => App);
