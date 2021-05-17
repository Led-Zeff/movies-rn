import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast, MovieDetail } from '../model/movie';
import currencyFormatter from 'currency-formatter';
import { CastCard } from './CastCard';

interface Props {
  details: MovieDetail;
  cast: Cast[];
}

export const MovieDetails = ({ details, cast }: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Icon name="star-outline" color={palette.secondary} size={16} />
        <Text style={styles.small}> {details.vote_average}</Text>
        <Text style={{ ...styles.small, marginLeft: 10 }}>
          {details.genres.map(g => g.name).join(', ')}
        </Text>
      </View>

      <View style={{ ...styles.container, marginTop: 10 }}>
        <Text style={styles.text}>{details.overview}</Text>
      </View>

      <View style={{ ...styles.container, marginTop: 10 }}>
        <Text style={styles.small}>
          Budget: {currencyFormatter.format(details.budget, { code: 'USD' })}
        </Text>
      </View>

      <View
        style={{ ...styles.container, marginTop: 10, flexDirection: 'column' }}>
        <Text style={{ ...styles.text, fontSize: 18, marginBottom: 5 }}>
          Actors
        </Text>

        <FlatList
          data={cast}
          keyExtractor={actor => actor.id.toString()}
          renderItem={({ item }) => <CastCard actor={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const palette = {
  primary: '#fafafa',
  secondary: '#bdbdbd',
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  small: {
    color: palette.secondary,
    fontSize: 14,
  },
  text: {
    color: palette.primary,
    fontSize: 16,
  },
});
