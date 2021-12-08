import React, { ReactElement } from "react";

import {
  Dimensions,
  ViewStyle,
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
const DIMENSIONS = Dimensions.get("window");
export type ProgressStepsProps = {
  children: Array<ReactElement>;
  onFinish: Function;
  containerStyle: ViewStyle;
  indicatorHeight?: number;
  indicatorColor?: string;
  renderNextButton: (onPress: () => any) => ReactElement;
  renderEndButton: (onPress: () => any) => ReactElement;
  indicatorContainerStyle: ViewStyle;
};
const ProgressSteps = ({
  children,
  onFinish,
  containerStyle,
  indicatorHeight = 40,
  indicatorColor = "#000",
  indicatorContainerStyle,
  renderEndButton,
  renderNextButton,
}: ProgressStepsProps) => {
  if (!Array.isArray(children)) {
    children = [children];
  }
  const animation = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const index = React.useRef(new Animated.Value(0)).current;
  const [curentIndex, setCurrentIndex] = React.useState(0);

  const onNext = React.useCallback(
    (nextIndex) => {
      setTimeout(() => {
        if (children.length === nextIndex) {
          onFinish();
        } else {
          setCurrentIndex(nextIndex);
          index.setValue(nextIndex);
        }
      }, 150);
    },
    [children.length]
  );
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: index,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);
  const { width } = DIMENSIONS;
  const length = children.length;
  const translateX =
    length > 1
      ? animation.interpolate({
          inputRange: children.map((_, index) => index),
          outputRange: children.map((_, index) => index * -width),
        })
      : 0;
  const isEnd = curentIndex + 1 === length;
  return (
    <View style={[{ flex: 1 }, containerStyle]}>
      <Indicators
        curentIndex={curentIndex}
        width={width - 30}
        indicatorColor={indicatorColor}
        indicatorHeight={indicatorHeight}
        onNext={onNext}
        items={children}
        indicatorContainerStyle={indicatorContainerStyle}
        animation={animation}
      />
      <Animated.View
        style={{
          flexDirection: "row",
          width: width * length,
          flex: 1,
          transform: [{ translateX }],
        }}
      >
        {children.map((child, index) => (
          <View
            style={{
              width: width,
              flex: 1,
            }}
            key={index}
          >
            {child}
          </View>
        ))}
      </Animated.View>
      {isEnd && renderEndButton(() => onNext(curentIndex + 1))}
      {!isEnd && renderNextButton(() => onNext(curentIndex + 1))}
    </View>
  );
};

export default ProgressSteps;

type IndicatorPorps = {
  width: number;
  items: Array<any>;
  animation: Animated.Value;
  curentIndex: number;
  onNext: (nextIndex: number) => any;
  indicatorColor: string;
  indicatorHeight: number;
  indicatorContainerStyle: ViewStyle;
};

const Indicators = ({
  width,
  items,
  animation,
  curentIndex,
  onNext,
  indicatorColor,
  indicatorHeight,
  indicatorContainerStyle,
}: IndicatorPorps) => {
  const onGoToIndex = React.useCallback(
    (index) => {
      if (index >= curentIndex) return;
      onNext(index);
    },
    [curentIndex]
  );
  let SPACING = items.length * 10;
  const itemWidth = (width - SPACING) / items.length;
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          width,
          alignSelf: "center",
        },
        indicatorContainerStyle,
      ]}
    >
      {items.map((_, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => onGoToIndex(index)}>
            <View
              style={{
                marginHorizontal: 5,
                width: itemWidth,
                height: indicatorHeight,
              }}
            >
              <View
                style={{
                  width: itemWidth,
                  height: indicatorHeight,
                  backgroundColor: indicatorColor,
                  opacity: 0.3,
                }}
              />
              <Animated.View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: animation.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0, itemWidth, itemWidth],
                    extrapolate: "clamp",
                  }),
                  backgroundColor: indicatorColor,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
