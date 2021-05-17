import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Movie } from '../model/movie';
import { MovieCard } from './MovieCard';

interface Props<T> {
  title?: string;
  data: T[];
  loading?: boolean;
}

export const HorizontalSlider = <T extends Movie>({
  title,
  data,
  loading,
}: Props<T>) => {
  if (loading) {
    return (
      <View style={{ ...styles.loadingContainer }}>
        <ActivityIndicator size={50} color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.text}>{title}</Text>}

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MovieCard movie={item} height={200} width={140} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    marginTop: 16,
  },
  listContainer: {
    height: 205,
  },
  text: {
    color: 'white',
    fontSize: 25,
    marginBottom: 6,
    marginLeft: 10,
  },
});
