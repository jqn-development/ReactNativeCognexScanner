/**
 * App/Components/HOCs/withZoomGesture.js
 * Experimental HOC
 */
import React, { Component } from "react";
import { View, PanResponder, Dimensions } from "react-native";

// ZoomView
class ZoomView extends Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onPanResponderMove: (e, { dy }) => {
        const { height: windowHeight } = Dimensions.get("window");
        return this.props.onZoomProgress(
          Math.min(Math.max((dy * -1) / windowHeight, 0), 0.5)
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
      }
    });
  }
  render() {
    return (
      <View
        style={{ flex: 1, width: "100%", backgroundColor: "#FFF" }}
        {...this._panResponder.panHandlers}
      >
        {this.props.children}
      </View>
    );
  }
}

export default ZoomView;
