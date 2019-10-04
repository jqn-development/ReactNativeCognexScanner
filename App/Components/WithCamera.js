/**
 * App/Components/HOCs/withZoomGesture.js
 */
import React from "react";
import {
  View,
  PanResponder,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RNCamera } from "react-native-camera";

const withCamera = (WrappedComponent, incrementNumber, children) => {
  return class NewCameraContainer extends React.Component {
    constructor(props) {
      super(props);
      this._panResponder = PanResponder.create({
        onPanResponderMove: (e, { dy }) => {
          const { height: windowHeight } = Dimensions.get("window");
          return this.props.onZoomProgress(
            Math.min(Math.max((dy * -1) / windowHeight, 0), 0.5),
          );
        },
        onMoveShouldSetPanResponder: (ev, { dx }) => {
          return dx !== 0;
        },
        onPanResponderGrant: () => {
          return this.props.onZoomStart();
        },
        onPanResponderRelease: () => {
          return this.props.onZoomEnd();
        },
      });
      this.state = {
        shutterDisabled: false,
      };
    }

    takePicture = async () => {
      if (this.camera) {
        this.setState({ shutterDisabled: true });
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        this.setState({ shutterDisabled: false }, () => {
          this.props.processData(data);
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          style={{
            flex: 1,
          }}
          {...this._panResponder.panHandlers}
        >
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            captureAudio={false}
          >
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                disabled={this.state.shutterDisabled}
                onPress={() => this.takePicture()}
                style={styles.capture}
              >
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
            {this.props.children}
          </RNCamera>
        </WrappedComponent>
      );
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});

export default withCamera;
