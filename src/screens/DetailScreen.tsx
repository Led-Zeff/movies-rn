import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { MovieDetails } from '../components/MovieDetails';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { Movie } from '../model/movie';
import { RootStackParams } from '../navigation/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'Detail'> {
  movie: Movie;
}

const screenHeight = Dimensions.get('screen').height;

export const DetailScreen = ({
  route: { params: movie },
  navigation,
}: Props) => {
  const { isLoading, movie: movieDetails, cast } = useMovieDetails(movie.id);
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <ScrollView>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon color="#e0e0e0" name="arrow-back-outline" size={40} />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
      </View>

      <View style={styles.descContainer}>
        <Text style={styles.title}>{movie.original_title}</Text>
      </View>

      <View>
        {isLoading || !movieDetails ? (
          <ActivityIndicator size={30} color="white" />
        ) : (
          <MovieDetails details={movieDetails} cast={cast} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
  },
  image: {
    flex: 1,
  },
  descContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: '#fafafa',
  },
  subTitle: {
    fontSize: 17,
    color: '#9e9e9e',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    top: 20,
    left: 20,
  },
});
