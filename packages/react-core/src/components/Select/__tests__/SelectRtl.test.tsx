import React from 'react';

import { configure, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Select } from '../Select';
import { SelectVariant } from '../selectConstants';
import { SelectOption } from '../SelectOption';
import { mount } from 'enzyme';

describe('Select', () => {
  beforeAll(() => configure({ testIdAttribute: 'data-ouia-component-id' }));

  // Without having to mock an onChange event handler, the "Create" option's existence after typing a
  // new value is verified by identifying exactly what text you would expect the user to have visibility of.
  it('test creatable option (testing-library - new test)', async () => {
    render(
      <Select
        variant={SelectVariant.typeahead}
        onSelect={jest.fn()}
        onToggle={jest.fn()}
        isOpen
        isCreatable
        ouiaId="custom-select-id"
      >
        <SelectOption id="option-1" value="seinfeld" />
        <SelectOption id="option-2" value="kramer" />
      </Select>
    );
    const selectInput = screen.getByTestId('custom-select-id').querySelector('input');
    userEvent.type(selectInput, 'costanza');

    expect(screen.getByText('Create "costanza"')).toBeVisible();
  });
});

// We are making sure the snapshot is matched, but what the snapshot is expected to contain is not
// clear or obvious until inspecting the snapshot, which is 300+ lines for this simple Select example.

// Another issue here is that the select option list item IDs are re-generated with every render, so
// each time this test runs, the snapshots will need to be updated again.
it('test creatable option (Enzyme - existing test)', () => {
  const mockEvent = { target: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>;
  const view = mount(
    <Select variant={SelectVariant.typeahead} onToggle={jest.fn()} isOpen isCreatable>
      <SelectOption id="option-1" value="seinfeld" />
      <SelectOption id="option-2" value="kramer" />
    </Select>
  );
  const inst = view.find('Select').instance() as any;
  inst.onChange(mockEvent);
  view.update();
  expect(view).toMatchSnapshot();
});
