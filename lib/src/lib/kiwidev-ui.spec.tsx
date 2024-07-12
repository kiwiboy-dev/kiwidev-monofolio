import { render } from '@testing-library/react';

import KiwidevUi from './kiwidev-ui';

describe('KiwidevUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KiwidevUi />);
    expect(baseElement).toBeTruthy();
  });
});
