import React, { createContext, useState } from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setMainColors: (newColors: Partial<ImageColors>) => void;
  setPrevMainColors: (prevColors: Partial<ImageColors>) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });
  const [prevColors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setMainColors = (newColors: Partial<ImageColors>) => {
    setColors({
      primary: newColors.primary ?? 'transparent',
      secondary: newColors.secondary ?? 'transparent',
    });
  };

  const setPrevMainColors = (newColors: Partial<ImageColors>) => {
    setPrevColors({
      primary: newColors.primary ?? 'transparent',
      secondary: newColors.secondary ?? 'transparent',
    });
  };

  return (
    <GradientContext.Provider
      value={{ colors, prevColors, setMainColors, setPrevMainColors }}>
      {children}
    </GradientContext.Provider>
  );
};
