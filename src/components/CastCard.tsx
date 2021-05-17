import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Cast } from '../model/movie';

interface Props {
  actor: Cast;
}

export const CastCard = ({ actor }: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

  return (
    <View style={styles.container}>
      {actor.profile_path && <Image source={{ uri }} style={styles.image} />}

      <View style={styles.textContainer}>
        <Text style={{ fontSize: 16, color: '#e0e0e0' }}>{actor.name}</Text>
        <Text style={{ fontSize: 14, color: '#9e9e9e' }}>
          {actor.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#424242',
    flexDirection: 'row',
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
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
