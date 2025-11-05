import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { SecondaryButtonComponent } from './secondary-button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SecondaryButtonComponent> = {
  title: 'Components/Buttons/Secondary Button',
  component: SecondaryButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The Button label',
      type: 'string',
      control: 'text'
    },
    buttonColor: {
      description: 'Color of the Button',
      type: 'string',
      control: 'color',
      table:{defaultValue: {summary: '#FAFAFC'}}
    },
    textColor: {
      description: 'Text Color in the Button',
      type: 'string',
      control: 'color',
      table:{defaultValue: {summary: '#161617'}}
    },
    size: {
      description: 'How large the button should be?',
      type: 'string',
      options: ['small', 'medium', 'large'],
      control: 'radio',
      table:{defaultValue: {summary: 'medium'}}
    },
    isDisabled: {
      description: 'Disables/Enables the Button',
      type: 'boolean',
      options: [true, false],
      control: 'boolean',
      table:{defaultValue: {summary: 'false'}}
    },
    clicked: {
      description: 'Click handler',
      type: 'function',
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { clicked: fn(), label: 'Primary Button' },
};

export default meta;
type Story = StoryObj<SecondaryButtonComponent>;

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button'
  },
};

export const Medium: Story = {
    args: {
      size: 'medium',
      label: 'Medium Button'
    },
};

export const Large: Story = {
    args: {
      size: 'large',
      label: 'Large Button'
    },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    isDisabled: true
  },
};

export const LeftIcon: Story = {
  args: {
    label: 'Left Icon',
    leftIcon: 'check'
  }
}

export const RightIcon: Story = {
  args: {
    label: 'Right Icon',
    rightIcon: 'check'
  }
}