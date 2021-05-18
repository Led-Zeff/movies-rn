import React, { useContext, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useFade } from '../hooks/useFade';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const GradientView = ({ children }: Props) => {
  const { colors, prevColors, setPrevMainColors } = useContext(GradientContext);
  const { opacity, fadeIn, fadeOut } = useFade();

  useEffect(() => {
    fadeIn(() => {
      setPrevMainColors(colors);
      fadeOut();
    });
  }, [colors]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, 'transparent']}
        start={{ x: 0.4, y: 0.1 }}
        end={{ x: 0.5, y: 0.7 }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />

      <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity }}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, 'transparent']}
          start={{ x: 0.4, y: 0.1 }}
          end={{ x: 0.5, y: 0.7 }}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      </Animated.View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
