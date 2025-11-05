import { type Meta, type StoryObj } from '@storybook/angular';

import { ProgressSpinnerComponent } from './progress-spinner.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ProgressSpinnerComponent> = {
    title: 'Components/Loaders/Progress Spinner',
    component: ProgressSpinnerComponent,
    tags: ['autodocs'],
    argTypes: {
        mode: {
            description: 'Progress Spinner mode',
            type: 'string',
            control: 'radio',
            options: ['determinate', 'indeterminate'],
            table: { defaultValue: { summary: 'indeterminate' } }
        },
        value: {
            description: 'Value of the spinner, if the mode is determinate',
            type: 'number',
            control: 'number'
        },
        diameter: {
            description: 'Diameter of the spinner',
            type: 'number',
            control: 'number',
            table: { defaultValue: { summary: '100' } }
        },
        strokeWidth: {
            description: 'Stroke Width of the spinner',
            type: 'number',
            control: 'number',
            table: { defaultValue: { summary: '10' } }
        },
        isOverlayNeeded: {
            description: 'Is the progress spinner needed as overlay?',
            type: 'boolean',
            control: 'boolean',
            table: { defaultValue: { summary: 'false' } }
        },
        message: {
            description: 'Progress message',
            type: 'string',
            control: 'text',
            table: { defaultValue: { summary: '' } }
        }
    }
};

export default meta;
type Story = StoryObj<ProgressSpinnerComponent>;

export const ProgressSpinner: Story = {
    args: {
        mode: 'indeterminate',
        value: 50
    },
};
