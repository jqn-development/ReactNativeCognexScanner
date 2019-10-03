import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

export default class PinchZoomView extends React.Component {
  onGesturePinch = ({ nativeEvent }) => {
    // console.log("native event", nativeEvent.focal);
    this.props.onPinchProgress(nativeEvent.scale);
  };

  onPinchHandlerStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      this.props.onPinchEnd();
    } else if (
      event.nativeEvent.oldState === State.BEGAN &&
      event.nativeEvent.state === State.ACTIVE
    ) {
      this.props.onPinchStart();
    }
  };

  render() {
    return (
      <PinchGestureHandler
        onGestureEvent={this.onGesturePinch}
        onHandlerStateChange={this.onPinchHandlerStateChange}
      >
        <View style={this.props.style}>{this.props.children}</View>
      </PinchGestureHandler>
    );
  }
}
PinchZoomView.propTypes = {
  // bla: PropTypes.string,
};

PinchZoomView.defaultProps = {
  onPinchProgress: () => {},
  onPinchStart: () => {},
  onPinchEnd: () => {},
};
