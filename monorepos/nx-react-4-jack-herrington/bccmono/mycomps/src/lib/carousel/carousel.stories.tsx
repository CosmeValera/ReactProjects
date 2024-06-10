import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './carousel';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Carousel',
};
export default meta;
type Story = StoryObj<typeof Carousel>;

export const Primary = {
  args: {},
};
