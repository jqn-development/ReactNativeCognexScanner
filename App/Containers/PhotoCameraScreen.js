import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./Styles/PhotoCameraScreenStyles";
import WithCamera from "../Components/WithCamera";
const ScreenWithCamera = WithCamera(View);

class PhotoCameraScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={[styles.container, styles.centeredContent]}>
          <Text>Something went wrong.</Text>
        </View>
      );
    }
    return (
      <ScreenWithCamera
        onZoomProgress={progress => console.log("progress", progress)}
        onZoomStart={() => {}}
        onZoomEnd={() => {}}
        processData={data => console.log("camera data", data)}
      ></ScreenWithCamera>
    );
  }
}

PhotoCameraScreen.propTypes = {
  // bla: PropTypes.string,
};

PhotoCameraScreen.defaultProps = {
  // bla: 'test',
};

export default PhotoCameraScreen;
