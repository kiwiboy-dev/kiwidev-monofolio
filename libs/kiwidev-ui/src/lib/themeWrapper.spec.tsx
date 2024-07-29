import React from 'react';
import { render } from '@testing-library/react';
import ThemeWrapper from './themeWrapper';

describe('ThemeWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeWrapper>CHILD</ThemeWrapper>);
    expect(baseElement).toBeTruthy();
  });
});
