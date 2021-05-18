import React from 'react';
import { Animated, Button, View } from 'react-native';
import { useFade } from '../hooks/useFade';

export const FadeScreen = () => {
  const { opacity, fadeIn, fadeOut } = useFade();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1565c0',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          backgroundColor: '#2196f3',
          height: 150,
          width: 150,
          borderColor: 'white',
          borderWidth: 10,
          opacity,
          marginBottom: 20,
        }}
      />

      <Button title="Fade in" onPress={fadeIn} />
      <Button title="Fade out" onPress={fadeOut} />
    </View>
  );
};
