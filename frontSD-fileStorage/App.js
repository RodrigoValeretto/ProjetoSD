import React, { Component } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import DownloadScreen from "./screens/DownloadScreen";

function downloadOptions() {
  const options = {
    title: "Arquivos para download",
    headerStyle: {
      backgroundColor: "#5c6bc0",
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
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DownloadScreen" component={DownloadScreen} options={downloadOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
