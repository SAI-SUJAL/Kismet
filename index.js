/**
 * @format
 */


import 'react-native-url-polyfill/auto';
import {AppRegistry,Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.config';



AppRegistry.registerComponent('main', () => App);
if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('main');
    AppRegistry.runApplication('main', { rootTag });
}

// import { registerRootComponent } from "expo";
// import App from "./App";

// registerRootComponent(App);
