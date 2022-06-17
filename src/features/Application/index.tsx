import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import type { FunctionComponent } from "react";

import { HomeScreen } from "../HomeScreen";
import { SettingsScreen } from "../SettingsScreen";

const Drawer = createDrawerNavigator();

export const Application: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="botbotnotbot" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
