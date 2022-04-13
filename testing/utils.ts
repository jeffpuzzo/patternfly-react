import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  const { asFragment } = render(ui, options);
  return asFragment().firstChild as HTMLElement;
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
