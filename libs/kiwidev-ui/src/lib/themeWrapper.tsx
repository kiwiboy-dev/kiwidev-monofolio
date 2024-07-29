import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export type ThemeWrapperOptions = {
  colors: {
    [color: string]: ColorRange;
  }
};

/**
 * Use https://smart-swatch.netlify.app to calculate your color range
 */
type ColorRange = {
  50: string,
  100: string,
  200: string,
  300: string,
  400: string,
  500: string,
  600: string,
  700: string,
  800: string,
  900: string,
}

type ThemeWrapperProps = {
  children: React.ReactNode;
  themeOptions?: ThemeWrapperOptions | Record<string, never>;
}

export const ThemeWrapper = ({children, themeOptions = {}}: ThemeWrapperProps) => {
  const theme = extendTheme(themeOptions);

  return(
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export default ThemeWrapper