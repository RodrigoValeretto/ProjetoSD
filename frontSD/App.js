import React, { Component } from "react";
import { render } from "react-dom";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import UploadScreen from "./screens/uploadScreen";
import DownloadScreen from "./screens/downloadScreen";

function headerOptions(page) {
  const options = {
    title: "Tela de " + page,
    headerStyle: {
      backgroundColor: "blue",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return options;
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} options={headerOptions("upload")} />
        <Stack.Screen name="DownloadScreen" component={DownloadScreen} options={headerOptions("download")} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
