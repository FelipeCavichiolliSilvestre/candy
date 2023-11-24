import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./screens/routes";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./features/store";

function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ReduxProvider>
  );
}

export default App;
