import { createStackNavigator, createAppContainer } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import MlKitScanner from "../Containers/MlKitScanner";
import ScaleAndRotate from "../Containers/ScaleAndRotate";
import PhotoCameraScreen from "../Containers/PhotoCameraScreen";

import styles from "./Styles/NavigationStyles";

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    MlKit: { screen: MlKitScanner },
    ScaleAndRotate: { screen: ScaleAndRotate },
    PhotoCamera: { screen: PhotoCameraScreen },
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "PhotoCamera",
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default createAppContainer(PrimaryNav);
