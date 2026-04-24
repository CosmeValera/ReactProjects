import { render } from '@testing-library/react';

import Carousel from './carousel';

describe('Carousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Carousel />);
    expect(baseElement).toBeTruthy();
  });
});
