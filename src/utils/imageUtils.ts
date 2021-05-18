import ImageColors from 'react-native-image-colors';

export const getImageColors = async (
  uri: string,
): Promise<{ primary?: string; secondary?: string }> => {
  const colors = await ImageColors.getColors(uri);
  if (colors.platform === 'android') {
    return { primary: colors.vibrant, secondary: colors.dominant };
  } else {
    return { primary: colors.primary, secondary: colors.secondary };
  }
};
