import React from 'react';
import { render, screen } from '@testing-library/react';
import { WizardBody } from '../WizardBody';

describe('WizardBody', () => {
  it('renders children without additional props', () => {
    const { container } = render(<WizardBody>content</WizardBody>);

    expect(container).toHaveTextContent('content');
    expect(container).not.toHaveAttribute('aria-label');
    expect(container).not.toHaveAttribute('aria-labelledby');
  });

  it('has no padding className when hasNoBodyPadding is not specified', () => {
    render(<WizardBody>content</WizardBody>);
    expect(screen.getByText('content')).not.toHaveClass('pf-m-no-padding');
  });

  it('has padding className when hasNoBodyPadding is specified', () => {
    render(<WizardBody hasNoBodyPadding>content</WizardBody>);
    expect(screen.getByText('content')).toHaveClass('pf-m-no-padding');
  });

  it('has aria-label when one is specified', () => {
    render(<WizardBody aria-label="Body label">content</WizardBody>);
    expect(screen.getByLabelText('Body label')).toBeVisible();
  });

  it('has aria-labelledby when one is specified', () => {
    const { container } = render(<WizardBody aria-labelledby="some-id">content</WizardBody>);
    expect(container.firstElementChild).toHaveAttribute('aria-labelledby', 'some-id');
  });

  it('wrapper element is of type div when wrapperElement is not specified', () => {
    const { container } = render(<WizardBody aria-label="Wizard body">content</WizardBody>);
    expect(container.firstElementChild?.tagName).toEqual('DIV');
  });

  it('renders with custom wrapperElement', () => {
    const { container } = render(<WizardBody wrapperElement="main">content</WizardBody>);
    expect(container.firstElementChild?.tagName).toEqual('MAIN');
  });
});
