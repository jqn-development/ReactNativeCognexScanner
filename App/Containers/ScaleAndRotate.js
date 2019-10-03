import React, { Component } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from "react-native-gesture-handler";

import PropTypes from "prop-types";
import styles from "./Styles/ScaleAndRotateStyles";

class ScaleAndRotate extends Component {
  panRef = React.createRef();
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);

    /* Pinching */
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._lastScale = 1;
    this._onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this._pinchScale } }],
      { useNativeDriver: true },
    );

    /* Rotation */
    this._rotate = new Animated.Value(0);
    this._rotateStr = this._rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ["-100rad", "100rad"],
    });
    this._lastRotate = 0;
    this._onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this._rotate } }],
      { useNativeDriver: true },
    );

    /* Tilt */
    this._tilt = new Animated.Value(0);
    this._tiltStr = this._tilt.interpolate({
      inputRange: [-501, -500, 0, 1],
      outputRange: ["1rad", "1rad", "0rad", "0rad"],
    });
    this._lastTilt = 0;
    this._onTiltGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._tilt } }],
      { useNativeDriver: true },
    );
    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("ScaleAndRotate will mount");
  };

  componentDidMount = () => {
    console.log("ScaleAndRotate mounted");
  };

  componentWillReceiveProps = nextProps => {
    console.log("ScaleAndRotate will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("ScaleAndRotate will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("ScaleAndRotate did update");
  };

  componentWillUnmount = () => {
    console.log("ScaleAndRotate will unmount");
  };

  _onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastRotate += event.nativeEvent.rotation;
      this._rotate.setOffset(this._lastRotate);
      this._rotate.setValue(0);
    }
  };
  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      console.log("last scale", event.nativeEvent.scale);
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };
  _onTiltGestureStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastTilt += event.nativeEvent.translationY;
      this._tilt.setOffset(this._lastTilt);
      this._tilt.setValue(0);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.ScaleAndRotateWrapper}>
          <Text>Something went wrong.</Text>
        </View>
      );
    }
    return (
      <PanGestureHandler
        ref={this.panRef}
        onGestureEvent={this._onTiltGestureEvent}
        onHandlerStateChange={this._onTiltGestureStateChange}
        minDist={10}
        minPointers={2}
        maxPointers={2}
        avgTouches
      >
        <Animated.View style={styles.wrapper}>
          <RotationGestureHandler
            ref={this.rotationRef}
            simultaneousHandlers={this.pinchRef}
            onGestureEvent={this._onRotateGestureEvent}
            onHandlerStateChange={this._onRotateHandlerStateChange}
          >
            <Animated.View style={styles.wrapper}>
              <PinchGestureHandler
                ref={this.pinchRef}
                simultaneousHandlers={this.rotationRef}
                onGestureEvent={this._onPinchGestureEvent}
                onHandlerStateChange={this._onPinchHandlerStateChange}
              >
                <Animated.View style={styles.container} collapsable={false}>
                  <Animated.Image
                    style={[
                      styles.pinchableImage,
                      {
                        transform: [
                          { perspective: 200 },
                          { scale: this._scale },
                          { rotate: this._rotateStr },
                          { rotateX: this._tiltStr },
                        ],
                      },
                    ]}
                    source={require("../Images/swmansion.png")}
                  />
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </RotationGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

ScaleAndRotate.propTypes = {
  // bla: PropTypes.string,
};

ScaleAndRotate.defaultProps = {
  // bla: 'test',
};

export default ScaleAndRotate;
