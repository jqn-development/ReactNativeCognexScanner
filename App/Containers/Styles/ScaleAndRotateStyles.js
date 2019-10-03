import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    overflow: "hidden",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  pinchableImage: {
    width: 250,
    height: 250,
  },
  wrapper: {
    flex: 1,
  },
});

export default styles;
