import { useState, useRef, useEffect, useCallback } from 'react';
import { Flex, Tabs, TabList, Tab, Box, Button, useTheme } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

type Section = {
  name: string;
  id: string;
}

type NavbarProps = {
  sections: Section[];
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
}

export const NavBar = ({ sections, sectionRefs }: NavbarProps) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);
  const navBarRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = useCallback((index: number) => {
    const navBarHeight = navBarRef.current?.offsetHeight || 0;
    const section = sectionRefs.current[index];
    if (section) {
      const top = section.offsetTop - navBarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [sectionRefs]);

  const updateActiveTab = useCallback(() => {
    const navBarHeight = navBarRef.current?.offsetHeight || 0;
    const scrollPosition = window.scrollY + navBarHeight + 1; // +1 to account for minor discrepancies

    let newActiveTab = 0;
    sectionRefs.current.forEach((section, index) => {
      if (section && section.offsetTop <= scrollPosition) {
        newActiveTab = index;
      }
    });

    setActiveTab(newActiveTab);
  }, [sectionRefs]);

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
    <Flex ref={navBarRef} as="header" position="fixed" w="100%" bg="white" zIndex="200" boxShadow="md">
        <Tabs index={activeTab} variant="line" w="100%" onChange={(index) => handleTabClick(index)}>
          <TabList>
            {sections.map((section, index) => (
              <Tab key={index} position="relative" _selected={{}}>
                {section.name}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: theme.colors.green[500],
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