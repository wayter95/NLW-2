import { StatusBar } from "expo-status-bar";
import React from "react";
import Landing from "./src/pages/Landing";

import { View } from "react-native";

export default function App() {
  return (
    <View>
      <Landing />
      <StatusBar style="auto" />
    </View>
  );
}
