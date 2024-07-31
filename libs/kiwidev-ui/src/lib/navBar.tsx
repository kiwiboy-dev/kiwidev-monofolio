import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { Flex, Tabs, TabList, Tab, Box, Button, useTheme, useToken } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

type Section = {
  name: string;
  id: string;
}

type NavbarProps = {
  navBarRef: React.MutableRefObject<(HTMLElement | null)>;
  sections: Section[];
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
}

export const NavBar = ({ navBarRef, sections, sectionRefs }: NavbarProps) => {
  const theme = useTheme();
  const primaryColor = useToken('colors', 'primary.300', theme.colors.blue[300]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabWidth, setActiveTabWidth] = useState<number>(0);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  const handleTabClick = useCallback((index: number) => {
    const navBarHeight = navBarRef.current?.offsetHeight || 0;
    const section = sectionRefs.current[index];
    if (section) {
      const top = section.offsetTop - navBarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [sectionRefs]);

  const updateActiveTab = useCallback(() => {
    const scrollPosition = window.scrollY + (window.innerHeight/2);

    let newActiveTab = 0;
    sectionRefs.current.forEach((section, index) => {
      if (section && section.offsetTop <= scrollPosition) {
        newActiveTab = index;
      }
    });

    setActiveTab(newActiveTab);
  }, [sectionRefs]);

  useLayoutEffect(() => {
    const activeTextElement = textRefs.current[activeTab];
    if (activeTextElement) {
      const textWidth = activeTextElement.getBoundingClientRect().width;
      console.log(textWidth);
      setActiveTabWidth(textWidth);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleScrollEvent = () => {
      updateActiveTab();
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [updateActiveTab]);

  // Initial update of active tab
  useEffect(() => {
    updateActiveTab();
  }, [updateActiveTab]);

  return (
    <Flex ref={navBarRef} as="header" position="fixed" w="100%" bg="primary.50" zIndex="200">
        <Tabs index={activeTab} variant="unstyled" w="100%" onChange={(index) => handleTabClick(index)}>
          <TabList>
            {sections.map((section, index) => (
              <Tab key={index} position="relative">
                <span ref={el => textRefs.current[index] = el}>
                  {section.name}
                </span>
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      borderRadius: '2px',
                      height: '4px',
                      width: `${activeTabWidth}px`,
                      background: primaryColor,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>
  );
}

export default NavBar;