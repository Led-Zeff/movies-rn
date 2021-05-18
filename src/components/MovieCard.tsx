import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Movie } from '../model/movie';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

export const MovieCard = ({ movie, height = 350, width = 240 }: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ height, width }}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Detail', movie)}>
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
});
