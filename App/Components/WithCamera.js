/**
 * App/Components/HOCs/withZoomGesture.js
 */
import React from "react";
import { View, PanResponder, Dimensions } from "react-native";

const withCamera = (WrappedComponent, incrementNumber, children) => {
  class WithCamera extends React.Component {
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
    }

    render() {
      return (
        <WrappedComponent
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          {...this._panResponder.panHandlers}
        >
          {this.props.children}
        </WrappedComponent>
      );
    }
  }
  return WithCamera;
};

export default withCamera;
