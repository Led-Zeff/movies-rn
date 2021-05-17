import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies';
import { Movie } from '../model/movie';

export const HomeScreen = () => {
  const [nowPlayingMovies, isLoadingNowPlaying] = useMovies('now_playing');
  const [popularMovies, isLoadingPopular] = useMovies('popular');
  const [topRatedMovies, isLoadingTopRated] = useMovies('top_rated');
  const [upcomingMovies, isLoadingUpcoming] = useMovies('upcoming');
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  useState;

  if (isLoadingNowPlaying) {
    return (
      <View style={{ ...styles.loadingContainer, marginTop: top }}>
        <ActivityIndicator size={50} color="white" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ marginTop: top + 20 }}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={nowPlayingMovies}
            renderItem={({ item }: { item: Movie }) => (
              <MovieCard movie={item} />
            )}
            sliderWidth={width}
            itemWidth={230}
            inactiveSlideOpacity={0.5}
          />
        </View>

        <HorizontalSlider
          title="Popular"
          data={popularMovies}
          loading={isLoadingPopular}
        />

        <HorizontalSlider
          title="Top rated"
          data={topRatedMovies}
          loading={isLoadingTopRated}
        />

        <HorizontalSlider
          title="Upcoming"
          data={upcomingMovies}
          loading={isLoadingUpcoming}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  carouselContainer: {
    height: 350,
  },
});
