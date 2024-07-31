// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styles from './app.module.scss';
import { ThemeWrapper, ThemeWrapperOptions, NavBar } from '@kiwidev-monofolio/kiwidev-ui';
import { Box } from '@chakra-ui/react';

// https://v2.chakra-ui.com/docs/hooks/use-token

const themeOptions: ThemeWrapperOptions = {
  colors: {
    primary: {
      50: '#ffe6e8',  //secondary
      100: '#f7bcc0',
      200: '#ec9297',
      300: '#e4686d', //main
      400: '#db3e45',
      500: '#c1252b',
      600: '#971b21',
      700: '#6d1316',
      800: '#43090c',
      900: '#1d0002',
    },
    accent: {
      50: '#fdfce2',
      100: '#faf6b7', //main
      200: '#f7f08a',
      300: '#f4ea5c',
      400: '#f1e433',
      500: '#d8ca1f',
      600: '#a89d17',
      700: '#78700e',
      800: '#484305',
      900: '#191600',
    },
    text: {
      50: '#fceeee',
      100: '#dfd4d6',
      200: '#c5babb',
      300: '#ad9e9f',
      400: '#938384',
      500: '#7b6a6b',
      600: '#605153',
      700: '#453a3b', //main
      800: '#2c2224',
      900: '#160909',
    }
  }
}

interface Section {
  name: string;
  id: string;
}

const sections: Section[] = [
  { name: 'Home', id: 'home' },
  { name: 'Section 1234234234', id: 'section1' },
  { name: 'Section 235', id: 'section2' },
  { name: 'Section 3', id: 'section3' }
];

export function App() {

  const navBarRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [navBarHeight, setNavBarHeight] = useState(0);

  useLayoutEffect(() => {
    if(navBarRef.current)
      setNavBarHeight(navBarRef.current.offsetHeight);
  }, [])

  return (
    <ThemeWrapper themeOptions={themeOptions}>
      <NavBar navBarRef={navBarRef} sections={sections} sectionRefs={sectionRefs} />
      <Box pt={`${navBarHeight}px`}>
        {sections.map((section, index) => (
          <Box
            key={index}
            ref={el => sectionRefs.current[index] = el}
            id={section.id}
            h={`calc(100vh * ${index+1})`}
            bg={`gray.${100 * (index + 1)}`}
          >
            <h2>{section.name}</h2>
          </Box>
        ))}
      </Box>
    </ThemeWrapper>
  );
}

export default App;
