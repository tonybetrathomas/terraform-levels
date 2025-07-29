import { type Meta, type StoryObj } from '@storybook/angular';

import { CheckboxComponent } from './checkbox.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CheckboxComponent> = {
    title: 'Components/Checkbox/Checkbox',
    component: CheckboxComponent,
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'Checkbox label',
            type: 'string',
            control: 'text'
        },
        checked: {
            description: 'Initial state of the checkbox',
            type: 'boolean',
            control: 'boolean',
            options: [true, false],
            table: { defaultValue: { summary: 'false' } }
        },
        disabled: {
            description: 'Enable or disable checkbox',
            type: 'boolean',
            control: 'boolean',
            options: [true, false],
            table: { defaultValue: { summary: 'false' } }
        },
        indeterminate: {
            description: 'Indeterminate state of checkbox',
            type: 'boolean',
            control: 'boolean',
            options: [true, false],
            table: { defaultValue: { summary: 'false' } }
        },
        value: {
            description: 'The value associated with the checkbox',
            type: 'string',
            control: 'text'
        },
        name: {
            description: 'For grouping checkboxes in a form',
            type: 'string',
            control: 'text'
        }
    }
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
    args: {
        label: 'Check'
    },
};

export const Disabled: Story = {
    args: {
        label: 'Check',
        checked: true,
        disabled: true
    },
};
