import { type Meta, type StoryObj } from '@storybook/angular';

import { DaterangepickerComponent } from './daterangepicker.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<DaterangepickerComponent> = {
    title: 'Components/Datepicker/Daterange Picker',
    component: DaterangepickerComponent,
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'Daterange picker label',
            type: 'string',
            control: 'text',
            // table: {defaultValue: {summary: 'Daterange Picker'}}
        },
        hint: {
            description: 'Daterange picker hint',
            type: 'string',
            control: 'text'
        }
    }
};

export default meta;
type Story = StoryObj<DaterangepickerComponent>;

export const Default: Story = {
    args: {
        label: 'Daterange picker'
    },
};
