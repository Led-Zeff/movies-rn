import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { GradientView } from '../components/GradientView';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MovieCard } from '../components/MovieCard';
import { GradientContext } from '../context/GradientContext';
import { useMovies } from '../hooks/useMovies';
import { Movie } from '../model/movie';
import { getImageColors } from '../utils/imageUtils';

export const HomeScreen = () => {
  const [nowPlayingMovies, isLoadingNowPlaying] = useMovies('now_playing');
  const [popularMovies, isLoadingPopular] = useMovies('popular');
  const [topRatedMovies, isLoadingTopRated] = useMovies('top_rated');
  const [upcomingMovies, isLoadingUpcoming] = useMovies('upcoming');
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { setMainColors } = useContext(GradientContext);

  const getColors = async (index: number) => {
    const uri = `https://image.tmdb.org/t/p/w500${nowPlayingMovies[index].poster_path}`;
    const colors = await getImageColors(uri);
    setMainColors(colors);
  };

  useEffect(() => {
    if (nowPlayingMovies.length > 0) {
      getColors(0);
    }
  }, [nowPlayingMovies]);

  if (isLoadingNowPlaying) {
    return (
      <View style={{ ...styles.loadingContainer, marginTop: top }}>
        <ActivityIndicator size={50} color="white" />
      </View>
    );
  }

  return (
    <GradientView>
      <ScrollView>
        <View style={{ marginTop: top + 20 }}>
          <View style={styles.carouselContainer}>
            <Carousel
              data={nowPlayingMovies}
              renderItem={({ item }: { item: Movie }) => (
                <MovieCard movie={item} />
              )}
              sliderWidth={width}
              itemWidth={240}
              inactiveSlideOpacity={0.8}
              // onSnapToItem={getImageColors}
              onBeforeSnapToItem={getColors}
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
    </GradientView>
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
