import { useRef } from 'react';
import { Animated } from 'react-native';

export const useFade = () => {
  const { current: opacity } = useRef(new Animated.Value(0));

  const fade = (val: number, callback?: Function) => {
    Animated.timing(opacity, {
      toValue: val,
      duration: 500,
      useNativeDriver: true,
    }).start(() => (callback ? callback() : null));
  };

  return {
    fadeIn: (callback?: Function) => fade(1, callback),
    fadeOut: (callback?: Function) => fade(0, callback),
    opacity,
  };
};
