import * as React from 'react';
import { render } from '@testing-library/react';
import { Brand } from '../Brand';

test('simple brand', () => {
  const { asFragment } = render(<Brand alt="brand" />);
  expect(asFragment()).toMatchSnapshot();
});
