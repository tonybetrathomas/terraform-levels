import { type Meta, type StoryObj } from '@storybook/angular';

import { SingleSelectDropdownComponent } from './single-select-dropdown.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SingleSelectDropdownComponent> = {
  title: 'Components/Dropdowns/Single Select Dropdown',
  component: SingleSelectDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Dropdown label',
      type: 'string',
      control: 'text'
    },
    placeholder: {
      description: 'Placeholder',
      type: 'string',
      control: 'text'
    },
    defaultOptionNeeded: {
      description: 'Enable or disable default options',
      type: 'boolean',
      options: [true, false],
      control: 'boolean',
      table:{defaultValue: {summary: 'false'}}
    },
    defaultOptionText: {
      description: 'Text to be displayed as default option',
      type: 'string',
      control: 'text',
      table:{defaultValue: {summary: '-- None --'}}
    },
    isDisabled: {
      description: 'Enable or disable dropdown',
      type: 'boolean',
      control: 'boolean',
      options: [true, false],
      table:{defaultValue: {summary: 'false'}}
    },
    options: {
      description: 'Options to be displayed in the dropdown. Accepted format: { value, label }',
      control: 'object'
    },
    size: {
      description: 'Size of the dropdown',
      type: 'string',
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      table:{defaultValue: {summary: 'medium'}}
    }
  }
};

export default meta;
type Story = StoryObj<SingleSelectDropdownComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    isDisabled: false,
    defaultOptionNeeded: true,
    defaultOptionText: 'None',
    options: [
      {value: '1', label: 'Option_One'},
      {value: '2', label: 'Option_Two'},
      {value: '3', label: 'Option_Three'}
    ]
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select an Option',
    isDisabled: true
  }
};