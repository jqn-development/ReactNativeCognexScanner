import { createStackNavigator, createAppContainer } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import MlKitScanner from "../Containers/MlKitScanner";

import styles from "./Styles/NavigationStyles";

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    MlKit: { screen: MlKitScanner },
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "MlKit",
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default createAppContainer(PrimaryNav);
