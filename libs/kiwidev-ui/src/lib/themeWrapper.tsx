import { Theme, ThemePanel, ThemeProps } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

interface ThemeWrapperProps {
  children: React.ReactNode;
  themeProps: ThemeProps;
  addThemePanel: boolean;
}

export function ThemeWrapper({children, themeProps, addThemePanel = false}: ThemeWrapperProps) {
  return(
    <Theme {...themeProps}>
      {children}
      {addThemePanel && <ThemePanel />}
    </Theme>
  )
}

export default ThemeWrapper