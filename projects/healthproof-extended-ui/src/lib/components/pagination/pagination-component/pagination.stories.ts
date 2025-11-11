import { type Meta, type StoryObj } from '@storybook/angular';

import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  title: 'Components/Pagination/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],

  argTypes: {
    totalItems: {
      description: 'Total number of rows / items (non-negative integer).',
      type: 'number',
      control: { type: 'number', min: 0, step: 1 },
    },
    initialPageSize: {
      description: 'Default page size (number of rows per page).',
      type: 'number',
      control: { type: 'number', min: 1, step: 1 },
    },
    pageSizeOptions: {
      description: 'Array of page size options shown in the page-size selector.',
      control: { type: 'object' },
    },
    maxVisiblePages: {
      description:
        'How many “middle” page buttons to show before collapsing to ellipses (integer).',
      type: 'number',
      control: { type: 'number', min: 1, step: 1 },
    },

    paginationChanged: {
      description: 'Emits when page or pageSize changes: { pageNo, pageSize } (pageNo is 1-based).',
      action: 'paginationChanged',
    },
  },
};

export default meta;

type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  args: {
    totalItems: 123,
    initialPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    maxVisiblePages: 5,
  },

  parameters: {
    actions: { handles: ['paginationChanged'] },
  },
};

export const ManyPages: Story = {
  args: {
    totalItems: 2000,
    initialPageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    maxVisiblePages: 7,
  },
  parameters: {
    actions: { handles: ['paginationChanged'] },
  },
};

export const ZeroItems: Story = {
  args: {
    totalItems: 0,
    initialPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    maxVisiblePages: 5,
  },
  parameters: {
    actions: { handles: ['paginationChanged'] },
  },
};

export const CustomSizes: Story = {
  args: {
    totalItems: 78,
    initialPageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
    maxVisiblePages: 3,
  },
  parameters: {
    actions: { handles: ['paginationChanged'] },
  },
};
