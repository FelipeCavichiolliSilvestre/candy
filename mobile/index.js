import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { name as appName } from "./app.json";
import App from "./src/App";

export default function Main() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
